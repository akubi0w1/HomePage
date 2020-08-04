package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

const (
	id         = 1
	title      = "sample title"
	file       = "sample file"
	activation = 1
)

var author = &User{ID: 1}

func TestLecture_Create(t *testing.T) {
	sample := getLectureSample()
	data := new(Lecture)
	data.Create(sample.Title, sample.File, sample.Comment, sample.Activation, sample.Author)

	assert.Equal(t, sample.Title, data.Title)
	assert.Equal(t, sample.File, data.File)
	assert.Equal(t, sample.Comment, data.Comment)
	assert.Equal(t, sample.Author, data.Author)
	assert.Equal(t, sample.Activation, data.Activation)
	assert.NotNil(t, data.CreatedAt)
	assert.NotNil(t, data.UpdatedAt)
}

func TestLecture_Update(t *testing.T) {
	sample := getLectureSample()

	preData := &Lecture{ID: sample.ID}
	data := preData.Update(sample.Title, sample.File, sample.Comment, sample.Activation, sample.Author)

	assert.Equal(t, sample.ID, data.ID)
	assert.Equal(t, sample.Title, data.Title)
	assert.Equal(t, sample.File, data.File)
	assert.Equal(t, sample.Comment, data.Comment)
	assert.Equal(t, sample.Author, data.Author)
	assert.Equal(t, sample.Activation, data.Activation)
	assert.NotNil(t, data.UpdatedAt)
}

func getLectureSample() *Lecture {
	return &Lecture{
		ID: 1,
		Author: &User{
			ID: 1,
		},
		Title:      "title",
		File:       "file",
		Comment:    "comment",
		Activation: 1,
	}
}
