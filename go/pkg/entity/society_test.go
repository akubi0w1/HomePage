package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSociety_Create(t *testing.T) {
	sample := getSocietySample()

	data := new(Society)
	data.Create(sample.Title, sample.Author, sample.Society, sample.Award, sample.Date)

	assert.Equal(t, sample.Title, data.Title)
	assert.Equal(t, sample.Author, data.Author)
	assert.Equal(t, sample.Society, data.Society)
	assert.Equal(t, sample.Award, data.Award)
	assert.Equal(t, sample.Date, data.Date)
	assert.NotNil(t, data.CreatedAt)
	assert.NotNil(t, data.UpdatedAt)
}

func TestSociety_Update(t *testing.T) {
	sample := getSocietySample()

	preData := &Society{ID: sample.ID}
	data := preData.Update(sample.Title, sample.Author, sample.Society, sample.Award, sample.Date)

	assert.Equal(t, sample.ID, data.ID)
	assert.Equal(t, sample.Title, data.Title)
	assert.Equal(t, sample.Author, data.Author)
	assert.Equal(t, sample.Society, data.Society)
	assert.Equal(t, sample.Award, data.Award)
	assert.Equal(t, sample.Date, data.Date)
	assert.NotNil(t, data.UpdatedAt)
}

func getSocietySample() *Society {
	return &Society{
		ID:      1,
		Title:   "sample title",
		Author:  "sample author",
		Society: "sample society",
		Award:   "sample award",
		Date:    "sample data",
	}
}
