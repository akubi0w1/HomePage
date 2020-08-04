package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestActivity_Create(t *testing.T) {
	sample := getActivitySample()

	data := new(Activity)
	data.Create(sample.Activity, sample.ShowDate, sample.Date, sample.Annotation, sample.IsImportant, sample.IsNotify)

	assert.Equal(t, sample.Activity, data.Activity)
	assert.Equal(t, sample.ShowDate, data.ShowDate)
	assert.Equal(t, sample.Date, data.Date)
	assert.Equal(t, sample.Annotation, data.Annotation)
	assert.Equal(t, sample.IsImportant, data.IsImportant)
	assert.Equal(t, sample.IsNotify, data.IsNotify)
	assert.NotNil(t, data.CreatedAt)
	assert.NotNil(t, data.UpdatedAt)
}

func TestActivity_Update(t *testing.T) {
	sample := getActivitySample()

	preData := Activity{ID: sample.ID}
	data := preData.Update(sample.Activity, sample.ShowDate, sample.Date, sample.Annotation, sample.IsImportant, sample.IsNotify)

	assert.Equal(t, sample.ID, data.ID)
	assert.Equal(t, sample.Activity, data.Activity)
	assert.Equal(t, sample.ShowDate, data.ShowDate)
	assert.Equal(t, sample.Date, data.Date)
	assert.Equal(t, sample.Annotation, data.Annotation)
	assert.Equal(t, sample.IsImportant, data.IsImportant)
	assert.Equal(t, sample.IsNotify, data.IsNotify)
	assert.NotNil(t, data.UpdatedAt)
}

func getActivitySample() *Activity {
	return &Activity{
		ID:          1,
		Activity:    "activity",
		ShowDate:    "showDate",
		Date:        "date",
		Annotation:  "annotation",
		IsImportant: 1,
		IsNotify:    1,
	}
}
