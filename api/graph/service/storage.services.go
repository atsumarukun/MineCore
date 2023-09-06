package service

import (
	"api/graph/model"
	"io/ioutil"
	"fmt"
	"os"

	"github.com/99designs/gqlgen/graphql"
)

func (_ StorageService) GetFiles(path string) ([]*model.File, error) {
	var fs []*model.File
	var ds []*model.File

	files, err := ioutil.ReadDir(fmt.Sprintf("/go/src/api/storage%s", path))
	if err != nil {
		return nil, err
	}

	for _, file := range files {
		if file.IsDir() {
			ds = append(ds, &model.File{file.Name(), fmt.Sprintf("%s/%s", path, file.Name()), file.IsDir()})
		} else {
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

type StorageService struct{}
