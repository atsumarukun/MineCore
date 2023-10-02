// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

import (
	"fmt"
	"io"
	"strconv"
	"time"
)

type Download struct {
	Name string `json:"name"`
	Data string `json:"data"`
}

type File struct {
	Name      string     `json:"name"`
	Key       string     `json:"key"`
	Type      string     `json:"type"`
	IsDir     bool       `json:"isDir"`
	Size      *int       `json:"size,omitempty"`
	UpdatedAt *time.Time `json:"updated_at,omitempty"`
}

type Service struct {
	Name   string `json:"name"`
	Path   string `json:"path"`
	Status Status `json:"status"`
}

type UpdateFileInput struct {
	Key         string `json:"key"`
	Destination string `json:"destination"`
}

type Status string

const (
	StatusRunning Status = "RUNNING"
	StatusExited  Status = "EXITED"
	StatusPartial Status = "PARTIAL"
)

var AllStatus = []Status{
	StatusRunning,
	StatusExited,
	StatusPartial,
}

func (e Status) IsValid() bool {
	switch e {
	case StatusRunning, StatusExited, StatusPartial:
		return true
	}
	return false
}

func (e Status) String() string {
	return string(e)
}

func (e *Status) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = Status(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid Status", str)
	}
	return nil
}

func (e Status) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
