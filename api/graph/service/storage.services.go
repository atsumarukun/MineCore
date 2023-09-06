package service

import (
	"api/graph/model"
	"io/ioutil"
	"fmt"
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

type StorageService struct{}
