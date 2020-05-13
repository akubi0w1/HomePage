package handler

import (
	"fmt"
	"homepage/pkg/configs"
	"homepage/pkg/infrastructure/auth"
	"homepage/pkg/infrastructure/server/response"
	"homepage/pkg/interface/controller"
	"homepage/pkg/interface/repository"
	"homepage/pkg/usecase/interactor"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type userHandler struct {
	controller.UserController
}

// UserHandler 入力と出力の受付
type UserHandler interface {
	GetAllGroupByGrade(w http.ResponseWriter, r *http.Request)
	GetByID(w http.ResponseWriter, r *http.Request)
	UpdateByID(w http.ResponseWriter, r *http.Request)
	UpdatePasswordByStudentID(w http.ResponseWriter, r *http.Request)

	Login(w http.ResponseWriter, r *http.Request)
	Logout(w http.ResponseWriter, r *http.Request)

	// admin
	AdminLogin(w http.ResponseWriter, r *http.Request)
	AdminGetAll(w http.ResponseWriter, r *http.Request)
	AdminGetByID(w http.ResponseWriter, r *http.Request)
	AdminCreate(w http.ResponseWriter, r *http.Request)
	AdminUpdateByID(w http.ResponseWriter, r *http.Request)
	AdminDeleteByID(w http.ResponseWriter, r *http.Request)
}

// NewUserHandler ハンドラの作成
func NewUserHandler(sh repository.SQLHandler) UserHandler {
	return &userHandler{
		UserController: controller.NewUserController(
			interactor.NewUserInteractor(
				repository.NewUserRepository(sh),
				auth.NewVerifyHandler(),
			),
		),
	}
}

func (uh *userHandler) GetAllGroupByGrade(w http.ResponseWriter, r *http.Request) {
	info := createInfo(r, "user", auth.GetStudentIDFromCookie(r))

	res, err := uh.UserController.GetAllGroupByGrade()
	if err != nil {
		response.InternalServerError(w, info)
		return
	}

	response.Success(w, "member/index.html", info, res)
}

func (uh *userHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	info := createInfo(r, "user", auth.GetStudentIDFromCookie(r))

	userID, err := strconv.Atoi(mux.Vars(r)["id"])
	if err != nil {
		log.Println("userHandler: GetByID: path param parse error: ", err)
		response.InternalServerError(w, info)
		return
	}

	res, err := uh.UserController.GetByID(userID)
	if err != nil {
		response.InternalServerError(w, info)
		return
	}
	response.Success(w, "member/detail.html", info, res)
}

func (uh *userHandler) UpdateByID(w http.ResponseWriter, r *http.Request) {
	info := createInfo(r, "user", auth.GetStudentIDFromCookie(r))
	body, err := uh.UserController.GetByStudentID(info.StudentID)
	if err != nil {
		response.InternalServerError(w, info)
		return
	}
	if r.Method == "POST" {
		log.Println("user update: post")
		name := r.PostFormValue("name")
		studentID := r.PostFormValue("studentID")
		department := r.PostFormValue("department")
		comment := r.PostFormValue("comment")
		grade, err := strconv.Atoi(r.PostFormValue("grade"))
		if err != nil {
			// TODO: handling
			log.Println("int parse error")
		}
		// TODO: バリデーション!
		if name == "" || studentID == "" {
			info.Errors = append(info.Errors, "名前、学籍番号は必須")
			response.Success(w, "member/edit.html", info, body)
			return
		}

		user, err := uh.UserController.UpdateByID(body.ID, name, studentID, department, comment, grade)
		if err != nil {
			response.InternalServerError(w, info)
			return
		}
		log.Println("user update: ", user)
		http.Redirect(w, r, fmt.Sprintf("/members/%d", body.ID), http.StatusSeeOther)
	}
	response.Success(w, "member/edit.html", info, body)
}

func (uh *userHandler) UpdatePasswordByStudentID(w http.ResponseWriter, r *http.Request) {
	info := createInfo(r, "", auth.GetStudentIDFromCookie(r))
	var body interface{}
	if r.Method == "POST" {
		log.Println("password update!")
		oldPassword := r.PostFormValue("oldPassword")
		newPassword := r.PostFormValue("newPassword")
		confirmPassword := r.PostFormValue("confirmPassword")
		// バリデーション
		if oldPassword == "" || newPassword == "" || confirmPassword == "" {
			info.Errors = append(info.Errors, "全フィールドが必須です")
			response.Success(w, "member/password_edit.html", info, body)
			return
		}
		if newPassword != confirmPassword {
			info.Errors = append(info.Errors, "新しいパスワードと確認用パスワードが一致しませんでした")
			response.Success(w, "member/password_edit.html", info, body)
			return
		}

		err := uh.UserController.UpdatePasswordByStudentID(info.StudentID, oldPassword, newPassword)
		if err != nil {
			info.Errors = append(info.Errors, "更新失敗")
			response.Success(w, "member/password_edit.html", info, body)
			return
		}
		log.Println("success update password")
		http.Redirect(w, r, "/login", http.StatusSeeOther)
	}
	response.Success(w, "member/password_edit.html", info, body)
}

func (uh *userHandler) Login(w http.ResponseWriter, r *http.Request) {
	info := createInfo(r, "login", auth.GetStudentIDFromCookie(r))
	var body interface{}

	if r.Method == "POST" {
		studentID := r.PostFormValue("studentID")
		password := r.PostFormValue("password")

		if studentID == "" || password == "" {
			info.Errors = append(info.Errors, "全フィールドが必須です")
			response.Success(w, "login.html", info, body)
			return
		}

		err := uh.UserController.Login(studentID, password)
		if err != nil {
			log.Println("failed to login: ", err)
			info.Errors = append(info.Errors, "ログイン失敗")
			response.Success(w, "login.html", info, body)
			return
		}

		// jwtの作成
		token, err := auth.CreateToken(studentID)
		if err != nil {
			log.Println("failed to create token: ", err)
			response.InternalServerError(w, info)
			return
		}

		cookie := &http.Cookie{
			Name:  configs.CookieName,
			Value: token,
		}
		http.SetCookie(w, cookie)
		log.Println("redirect")
		http.Redirect(w, r, "/", http.StatusSeeOther)
	}
	response.Success(w, "login.html", info, body)
}

func (uh *userHandler) Logout(w http.ResponseWriter, r *http.Request) {
	info := createInfo(r, "logout", auth.GetStudentIDFromCookie(r))

	// cookieの取得
	cookie, err := r.Cookie(configs.CookieName)
	if err != nil {
		log.Println("Cookie: ", err)
		// TODO: ?こここれでいいのか？
		response.InternalServerError(w, info)
		return
	}
	cookie.MaxAge = -1
	http.SetCookie(w, cookie)
	http.Redirect(w, r, "/", http.StatusSeeOther)
}

// admin
func (uh *userHandler) AdminLogin(w http.ResponseWriter, r *http.Request) {
	info := createInfo(r, "login", auth.GetStudentIDFromCookie(r))
	var body interface{}

	if r.Method == "POST" {
		studentID := r.PostFormValue("studentID")
		password := r.PostFormValue("password")

		if studentID == "" || password == "" {
			info.Errors = append(info.Errors, "全フィールドが必須です")
			response.AdminRender(w, "login.html", info, body)
			return
		}

		err := uh.UserController.AdminLogin(studentID, password)
		if err != nil {
			log.Println("failed to login: ", err)
			info.Errors = append(info.Errors, "ログイン失敗")
			response.AdminRender(w, "login.html", info, body)
			return
		}

		// jwtの作成
		token, err := auth.CreateToken(studentID)
		if err != nil {
			log.Println("failed to create token: ", err)
			response.InternalServerError(w, info)
			return
		}

		cookie := &http.Cookie{
			Name:  configs.CookieName,
			Value: token,
		}
		http.SetCookie(w, cookie)

		// AdminSessionsに登録
		auth.SetAdminSession(studentID, token)
		log.Println("adminLogin: studentID is", studentID)

		http.Redirect(w, r, "/admin", http.StatusSeeOther)
	}
	response.AdminRender(w, "login.html", info, body)
}

func (uh *userHandler) AdminGetAll(w http.ResponseWriter, r *http.Request) {
	info := createInfo(r, "members", auth.GetStudentIDFromCookie(r))
	res, err := uh.UserController.AdminGetAll()
	if err != nil {
		log.Println("userHandler: AdminGetAll:", err)
		// TODO: ?
		response.InternalServerError(w, info)
		return
	}

	response.AdminRender(w, "list.html", info, res)
}

func (uh *userHandler) AdminGetByID(w http.ResponseWriter, r *http.Request) {
	info := createInfo(r, "members", auth.GetStudentIDFromCookie(r))
	userID, err := strconv.Atoi(mux.Vars(r)["id"])
	if err != nil {
		log.Println("userHandler: AdminGetByID: failed to parse path param: ", err)
		response.InternalServerError(w, info)
		return
	}
	res, err := uh.UserController.AdminGetByID(userID)
	if err != nil {
		log.Println("userHandler: AdminGetByID: ", err)
		response.InternalServerError(w, info)
		return
	}
	response.AdminRender(w, "detail.html", info, res)
}

func (uh *userHandler) AdminCreate(w http.ResponseWriter, r *http.Request) {
	info := createInfo(r, "members", auth.GetStudentIDFromCookie(r))
	// createform行こう
	gradeMap := map[string]string{
		"2": "学部2年",
		"3": "学部3年",
		"4": "学部4年",
		"5": "大学院1年",
		"6": "大学院2年",
		"0": "卒業生",
	}
	roleMap := map[string]string{
		"member": "member",
		"admin":  "admin",
		"owner":  "owner",
	}
	// create form
	body := []*FormField{
		createFormField("name", "", "名前", "text", nil),
		createFormField("studentID", "", "学籍番号", "text", nil),
		createFormField("department", "", "学部", "text", nil),
		createFormField("grade", "", "学年", "select", gradeMap),
		createFormField("password", "", "パスワード", "password", nil),
		createFormField("confirmPassword", "", "パスワード(確認用)", "password", nil),
		createFormField("role", "", "権限", "select", roleMap),
		createFormField("comment", "", "コメント", "textarea", nil),
	}

	if r.Method == "POST" {
		log.Println("user update: post")
		name := r.PostFormValue("name")
		studentID := r.PostFormValue("studentID")
		department := r.PostFormValue("department")
		comment := r.PostFormValue("comment")
		password := r.PostFormValue("password")
		confPassword := r.PostFormValue("confirmPassword")
		role := r.PostFormValue("role")
		grade, err := strconv.Atoi(r.PostFormValue("grade"))
		if err != nil {
			// TODO: handling
			log.Println("int parse error")
		}
		// TODO: バリデーション!
		if name == "" || studentID == "" || password == "" || confPassword == "" || role == "" {
			info.Errors = append(info.Errors, "名前、学籍番号、パスワード、権限は必須")
			response.AdminRender(w, "edit.html", info, body)
			return
		}
		if password != confPassword {
			info.Errors = append(info.Errors, "パスワードが一致しません")
			response.AdminRender(w, "edit.html", info, body)
			return
		}

		id, err := uh.UserController.AdminCreate(name, studentID, department, comment, password, role, grade)
		if err != nil {
			response.InternalServerError(w, info)
			return
		}
		log.Println("success create!")
		http.Redirect(w, r, fmt.Sprintf("/admin/members/%d", id), http.StatusSeeOther)
	}
	response.AdminRender(w, "edit.html", info, body)
}

func (uh *userHandler) AdminUpdateByID(w http.ResponseWriter, r *http.Request) {
	info := createInfo(r, "members", auth.GetStudentIDFromCookie(r))
	userID, err := strconv.Atoi(mux.Vars(r)["id"])
	if err != nil {
		// TODO: ?
		log.Println("userHandler: AdminUpdateByID: failed to parse path parameter", err)
		response.InternalServerError(w, info)
		return
	}
	// 初期値の獲得
	user, err := uh.UserController.GetByID(userID)
	if err != nil {
		log.Println("userHandler: AdminUpdateByID: ", err)
		response.InternalServerError(w, info)
		return
	}
	gradeMap := map[string]string{
		"2": "学部2年",
		"3": "学部3年",
		"4": "学部4年",
		"5": "大学院1年",
		"6": "大学院2年",
		"0": "卒業生",
	}
	roleMap := map[string]string{
		"member": "member",
		"admin":  "admin",
		"owner":  "owner",
	}
	// create form
	body := []*FormField{
		createFormField("name", user.Name, "名前", "text", nil),
		createFormField("studentID", user.StudentID, "学籍番号", "text", nil),
		createFormField("department", user.Department, "学部", "text", nil),
		createFormField("grade", user.Grade, "学年", "select", gradeMap),
		createFormField("role", "", "権限", "select", roleMap),
		createFormField("comment", user.Comment, "コメント", "textarea", nil),
	}

	if r.Method == "POST" {
		log.Println("user update: post")
		name := r.PostFormValue("name")
		studentID := r.PostFormValue("studentID")
		department := r.PostFormValue("department")
		comment := r.PostFormValue("comment")
		role := r.PostFormValue("role")
		grade, err := strconv.Atoi(r.PostFormValue("grade"))
		if err != nil {
			// TODO: handling
			log.Println("int parse error")
		}
		// TODO: バリデーション!
		if name == "" || studentID == "" || role == "" {
			info.Errors = append(info.Errors, "名前、学籍番号、権限は必須")
			response.AdminRender(w, "edit.html", info, body)
			return
		}

		err = uh.UserController.AdminUpdateByID(userID, name, studentID, department, comment, role, grade)
		if err != nil {
			response.InternalServerError(w, info)
			return
		}
		log.Println("success update!")
		http.Redirect(w, r, fmt.Sprintf("/admin/members/%d", userID), http.StatusSeeOther)
	}
	response.AdminRender(w, "edit.html", info, body)
}

func (uh *userHandler) AdminDeleteByID(w http.ResponseWriter, r *http.Request) {
	info := createInfo(r, "members", auth.GetStudentIDFromCookie(r))
	id, err := strconv.Atoi(mux.Vars(r)["id"])
	if err != nil {
		log.Println("failed to parse path parameter", err)
		response.InternalServerError(w, info)
		return
	}
	body, err := uh.UserController.AdminGetByID(id)
	if err != nil {
		log.Println("AdminDeleteByID: ", err)
		response.InternalServerError(w, info)
		return
	}

	if r.Method == "POST" {
		log.Println("post request: delete user")
		err = uh.UserController.DeleteByID(id)
		if err != nil {
			log.Println("failed to delete")
			info.Errors = append(info.Errors, "削除に失敗しました")
			response.AdminRender(w, "delete.html", info, body)
			return
		}
		log.Println("success to delete user")
		http.Redirect(w, r, "/admin/members", http.StatusSeeOther)
	}
	response.AdminRender(w, "delete.html", info, body)
}
