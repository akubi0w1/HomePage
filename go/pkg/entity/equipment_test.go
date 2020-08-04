package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

const (
	name    = "sample name"
	stock   = 1
	comment = "sample comment"
	tagID   = 1
)

func TestEquipment_Create(t *testing.T) {
	sample := getEquipmentSample()

	data := new(Equipment)
	data.Create(sample.Name, sample.Comment, sample.Stock, sample.Tag.ID)

	assert.Equal(t, sample.Name, data.Name)
	assert.Equal(t, sample.Stock, data.Stock)
	assert.Equal(t, sample.Comment, data.Comment)
	assert.Equal(t, sample.Tag.ID, data.Tag.ID)
	assert.NotNil(t, data.Tag)
	assert.NotNil(t, data.CreatedAt)
	assert.NotNil(t, data.UpdatedAt)
}

func TestEquipment_Update(t *testing.T) {
	sample := getEquipmentSample()

	preData := Equipment{ID: sample.ID, Tag: sample.Tag}
	data := preData.Update(sample.Name, sample.Comment, sample.Stock, sample.Tag.ID)

	assert.Equal(t, sample.ID, data.ID)
	assert.Equal(t, sample.Name, data.Name)
	assert.Equal(t, sample.Stock, data.Stock)
	assert.Equal(t, sample.Comment, data.Comment)
	assert.Equal(t, sample.Tag.ID, data.Tag.ID)
	assert.NotNil(t, data.Tag)
	assert.NotNil(t, data.UpdatedAt)
}

func getEquipmentSample() *Equipment {
	return &Equipment{
		ID:      1,
		Name:    "name",
		Stock:   1,
		Comment: "comment",
		Tag: &Tag{
			ID: 1,
		},
	}
}
