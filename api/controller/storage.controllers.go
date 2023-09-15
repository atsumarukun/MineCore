package controller

import (
	"net/http"
	"os"
	"io"
)

func (_ StorageController) UploadFiles(w http.ResponseWriter, q *http.Request) {
	if q.Method != "POST" {
		http.Error(w, "Route not found.", http.StatusMethodNotAllowed)
		return
	}
	
	reader, err := q.MultipartReader(); if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	for {
		part, err := reader.NextPart(); if err == io.EOF {
			break
		}

		uploadedFile, err := os.Create("/go/src/api/storage/" + part.FileName())
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		_, err = io.Copy(uploadedFile, part)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
	return
}

type StorageController struct{}