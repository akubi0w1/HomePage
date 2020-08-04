package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

const (
	company = "sample company"
	job     = "sample job"
)

func TestJob_Create(t *testing.T) {
	sample := getJobSample()

	data := new(Job)
	data.Create(sample.Company, sample.Job)

	assert.Equal(t, sample.Company, data.Company)
	assert.Equal(t, sample.Job, data.Job)
	assert.NotNil(t, data.CreatedAt)
	assert.NotNil(t, data.UpdatedAt)
}

func TestJob_Update(t *testing.T) {
	sample := getJobSample()

	preData := &Job{ID: sample.ID}
	data := preData.Update(sample.Company, sample.Job)

	assert.Equal(t, sample.Company, data.Company)
	assert.Equal(t, sample.Job, data.Job)
	assert.NotNil(t, data.UpdatedAt)
}

func getJobSample() *Job {
	return &Job{
		ID:      1,
		Company: "company",
		Job:     "job",
	}
}
