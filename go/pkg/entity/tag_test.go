package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestTag_Create(t *testing.T) {
	sample := getTagSample()

	data := new(Tag)
	data.Create(sample.Name)

	assert.Equal(t, sample.Name, data.Name)
	assert.NotNil(t, data.CreatedAt)
	assert.NotNil(t, data.UpdatedAt)
}

func TestTag_Update(t *testing.T) {
	sample := getTagSample()

	preData := &Tag{ID: sample.ID}
	data := preData.Update(sample.Name)

	assert.Equal(t, sample.ID, data.ID)
	assert.Equal(t, sample.Name, data.Name)
	assert.NotNil(t, data.UpdatedAt)
}

func getTagSample() *Tag {
	return &Tag{
		ID:   1,
		Name: "tag sample",
	}
}
