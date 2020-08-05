package auth

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSession_adminSession(t *testing.T) {

	adminStudentID := "adminID"
	memberStudentID := "memberID"
	adminToken, _ := CreateToken(adminStudentID)
	memberToken, _ := CreateToken(memberStudentID)

	t.Run("test set admin session", func(t *testing.T) {
		SetAdminSession(adminStudentID, adminToken)

		assert.Equal(t, adminSessions[adminStudentID], adminToken)
	})

	t.Run("test check is admin session", func(t *testing.T) {
		err := CheckIsAdminSession(adminStudentID, adminToken)

		assert.NoError(t, err)
	})

	t.Run("test check is admin session(member user)", func(t *testing.T) {
		err := CheckIsAdminSession(adminStudentID, memberToken)

		assert.Error(t, err)
	})
}

// TODO: net/http周りのテスト
