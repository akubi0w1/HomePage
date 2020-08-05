package auth

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestAuth_PasswordHash(t *testing.T) {
	handler := NewVerifyHandler()
	var rawPass string
	var hash string
	
	t.Run("test password hash", func(t *testing.T) {
		var err error
		rawPass = "password"
		hash, err = handler.PasswordHash(rawPass)

		assert.NotNil(t, hash)
		assert.NoError(t, err)
	})
	
	t.Run("test password verify", func(t *testing.T) {
		var err error
		err = handler.PasswordVerify(hash, rawPass)

		assert.NoError(t, err)
	})

	t.Run("test password over max length", func(t *testing.T) {
		var err error
		pass1 := strings.Repeat("a", 72) + "a"
		pass2 := strings.Repeat("a", 72) + "b"

		hash1, _ := handler.PasswordHash(pass1)
		hash2, _ := handler.PasswordHash(pass2)
		err = handler.PasswordVerify(pass1, hash2)

		assert.NotEqual(t, hash1, hash2)
		assert.Error(t, err)
	})
}
