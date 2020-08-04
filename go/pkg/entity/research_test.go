package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestResearch_Create(t *testing.T) {
	sample := getResearchSample()

	data := new(Research)
	data.Create(sample.Title, sample.Author, sample.File, sample.Comment, sample.Activation)

	assert.Equal(t, sample.Title, data.Title)
	assert.Equal(t, sample.Author, data.Author)
	assert.Equal(t, sample.File, data.File)
	assert.Equal(t, sample.Comment, data.Comment)
	assert.Equal(t, sample.Activation, data.Activation)
	assert.NotNil(t, data.CreatedAt)
	assert.NotNil(t, data.UpdatedAt)
}

func TestResearch_Update(t *testing.T) {
	sample := getResearchSample()

	preData := &Research{ID: sample.ID}
	data := preData.Update(sample.Title, sample.Author, sample.File, sample.Comment, sample.Activation)

	assert.Equal(t, sample.ID, sample.ID)
	assert.Equal(t, sample.Title, data.Title)
	assert.Equal(t, sample.Author, data.Author)
	assert.Equal(t, sample.File, data.File)
	assert.Equal(t, sample.Comment, data.Comment)
	assert.Equal(t, sample.Activation, data.Activation)
	assert.NotNil(t, data.UpdatedAt)
}

func getResearchSample() *Research {
	return &Research{
		ID:         1,
		Title:      "title",
		Author:     "author",
		File:       "file",
		Comment:    "comment",
		Activation: 1,
	}
}
