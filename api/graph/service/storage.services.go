package service

import (
	"api/graph/model"
	"io/ioutil"
	"strings"
	"regexp"
	"fmt"
	"io"
	"os"

	"github.com/99designs/gqlgen/graphql"
)

func (_ StorageService) GetFiles(path string, isDir *bool) ([]*model.File, error) {
	var fs []*model.File
	var ds []*model.File

	files, err := ioutil.ReadDir(fmt.Sprintf("/go/src/api/storage%s", path))
	if err != nil {
		return nil, err
	}

	for _, file := range files {
		if file.IsDir() && (isDir == nil || *isDir) {
			ds = append(ds, &model.File{file.Name(), fmt.Sprintf("%s/%s", path, file.Name()), file.IsDir()})
		} else if !file.IsDir() && (isDir == nil || !*isDir) {
			fs = append(fs, &model.File{file.Name(), fmt.Sprintf("%s/%s", path, file.Name()), file.IsDir()})
		}
	}

	return append(ds, fs...), nil
}

func (_ StorageService) UploadFiles(path string, files []*graphql.Upload) ([]*model.File, error) {
	var fs []*model.File

	for _, file := range files {
		buf, err := ioutil.ReadAll(file.File)
		if err != nil {
			return nil, err
		}

		if err := ioutil.WriteFile(fmt.Sprintf("/go/src/api/storage%s/%s", path, file.Filename), buf, os.ModePerm); err != nil {
			return nil, err
		}
		fs = append(fs, &model.File{file.Filename, fmt.Sprintf("%s/%s", path, file.Filename), false})
	}
	return fs, nil
}

func (_ StorageService) MoveFile(key string, destination string) (string, error) {
	if err := os.Rename(fmt.Sprintf("/go/src/api/storage%s", key), fmt.Sprintf("/go/src/api/storage%s", destination)); err != nil {
		return "", err
	}
	return destination, nil
}

func (_ StorageService) CopyFile(key string, destination string) (string, error) {
	file, err := os.Open(fmt.Sprintf("/go/src/api/storage%s", key))
	if err != nil {
		return "", err
	}

	var copy io.Writer
	if key == destination {
		copy, err = os.Create(fmt.Sprintf("/go/src/api/storage%s", strings.Replace(destination, ".", " copy.", 1)))
		if err != nil {
			return "", err
		}
	} else {
		copy, err = os.Create(fmt.Sprintf("/go/src/api/storage%s", destination))
		if err != nil {
			return "", err
		}
	}

	io.Copy(copy, file)
	return destination, nil
}

func (_ StorageService) RemoveFiles(keys []string) ([]string, error) {
	for _, key := range keys {
		if err := os.RemoveAll(fmt.Sprintf("/go/src/api/storage%s", key)); err != nil {
			return nil, err
		}
	}
	return keys, nil
}

type StorageService struct{}
