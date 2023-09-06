package service

import (
	"api/graph/model"
	"io/ioutil"
	"fmt"
)

func (_ StorageService) GetFiles(path string) ([]*model.File, error) {
	var fs []*model.File

	files, err := ioutil.ReadDir(fmt.Sprintf("/go/src/api/storage%s", path))
	if err != nil {
		return nil, err
	}

	for _, file := range files {
		fs = append(fs, &model.File{file.Name(), fmt.Sprintf("/go/src/api/storage%s/%s", path, file.Name()), file.IsDir()})
	}

	return fs, nil
}

type StorageService struct{}
