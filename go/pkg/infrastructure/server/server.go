package server

import (
	"fmt"
	"homepage/conf"
	"homepage/pkg/domain/logger"
	"net/http"
)

type server struct {
	Addr string
	Port string
}

// Server サーバ管理用
type Server interface {
	// Serve サーバを走らせる
	Serve()

	// Handle サーバのルーティング
	Handle(endpoint string, apiFunc http.HandlerFunc)
}

// NewServer サーバを作成する
func NewServer(addr, port string) Server {
	return &server{
		Addr: addr,
		Port: port,
	}
}

func (s *server) Serve() {
	logger.Info(fmt.Sprintf("Server running. http://%s:%s", s.Addr, s.Port))
	http.ListenAndServe(
		fmt.Sprintf("%s:%s", s.Addr, s.Port),
		nil,
	)
}

func (s *server) Handle(endpoint string, apiFunc http.HandlerFunc) {
	http.HandleFunc(endpoint, httpSetting(apiFunc))
}

func httpSetting(apiFunc http.HandlerFunc) http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		// CORS対応
		writer.Header().Add("Access-Control-Allow-Origin", conf.ClientServerAddr) // client server
		writer.Header().Add("Access-Control-Allow-Headers", "Content-Type,Accept,Origin")
		writer.Header().Add("Access-Control-Allow-Credentials", "true")
		writer.Header().Add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")

		// プリフライトリクエストは処理を通さない
		if request.Method == http.MethodOptions {
			return
		}

		// 共通のレスポンスヘッダを設定
		writer.Header().Add("Content-Type", "application/json")

		apiFunc(writer, request)
	}
}