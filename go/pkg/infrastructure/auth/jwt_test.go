package auth

import (
	"testing"

	"github.com/dgrijalva/jwt-go"
	"github.com/stretchr/testify/assert"
)

func TestJWT(t *testing.T) {
	const studentID = "sampleStudentID"
	var tokenString string
	var token *jwt.Token

	t.Run("test create token", func(t *testing.T) {
		var err error
		tokenString, err = CreateToken(studentID)

		assert.NoError(t, err)
		assert.NotNil(t, tokenString)
	})

	t.Run("test verify token", func(t *testing.T) {
		var err error
		token, err = VerifyToken(tokenString)

		assert.NoError(t, err)
		assert.NotNil(t, token)
	})

	t.Run("test get studentID from jwt", func(t *testing.T) {
		var err error
		res := GetStudentIDFromJWT(token)

		assert.NoError(t, err)
		assert.NotNil(t, res)
		assert.Equal(t, studentID, res)
	})
}
