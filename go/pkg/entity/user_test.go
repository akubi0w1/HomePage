package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestUser_Create(t *testing.T) {
	sample := getUserSample()

	data := new(User)
	data.Create(sample.Name, sample.StudentID, sample.Password, sample.Role, sample.Department, sample.Comment, sample.Grade)

	assert.Equal(t, sample.StudentID, data.StudentID)
	assert.Equal(t, sample.Name, data.Name)
	assert.Equal(t, sample.Password, data.Password)
	assert.Equal(t, sample.Role, data.Role)
	assert.Equal(t, sample.Department, data.Department)
	assert.Equal(t, sample.Grade, data.Grade)
	assert.Equal(t, sample.Comment, data.Comment)
	assert.NotNil(t, data.CreatedAt)
	assert.NotNil(t, data.UpdatedAt)
}

func TestUser_Update(t *testing.T) {
	sample := getUserSample()

	preData := &User{ID: sample.ID}
	data := preData.Update(sample.Name, sample.StudentID, sample.Department, sample.Comment, sample.Grade)

	assert.Equal(t, sample.ID, data.ID)
	assert.Equal(t, sample.StudentID, data.StudentID)
	assert.Equal(t, sample.Name, data.Name)
	assert.Equal(t, sample.Department, data.Department)
	assert.Equal(t, sample.Grade, data.Grade)
	assert.Equal(t, sample.Comment, data.Comment)
	assert.NotNil(t, data.UpdatedAt)
}

func getUserSample() *User {
	return &User{
		ID:         1,
		StudentID:  "studentID",
		Name:       "name",
		Password:   "password",
		Role:       "admin",
		Department: "department",
		Grade:      1,
		Comment:    "comment",
	}
}
