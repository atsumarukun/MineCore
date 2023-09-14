package service

import (
	"api/graph/model"
	"io/ioutil"
	"net/url"
	"strings"
	"context"
	"errors"
	"fmt"
	"io"
	"os"

	"github.com/99designs/gqlgen/graphql"
)

func GetFileType(name string) string {
	var filetype string

	if (strings.LastIndex(name, ".") == -1) {
		return "application"
	}
	extension := name[strings.LastIndex(name, ".") + 1:]

	// https://developer.mozilla.org/ja/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
	switch extension {
	case "jpeg", "jpg", "png", "svg", "gif", "bmp", "ico", "tif", "tiff", "webp":
		filetype = "image"
	case "mp4", "avi", "mpeg", "ogv", "ts", "webm":
		filetype = "video"
	case "mp3", "aac", "mid", "midi", "oga", "opus", "wav", "weba":
		filetype = "audio"
	case "txt", "csv", "css", "htm", "html", "ics", "js", "mjs":
		filetype = "text"
	default:
		filetype = "application"
	}

	return filetype
}

func (_ StorageService) GetFiles(ctx context.Context, path string, name *string, isDir *bool) ([]*model.File, error) {
	var fs []*model.File
	var ds []*model.File

	path, err  := url.QueryUnescape(path)
	if err != nil {
		return nil, err
	}

	if strings.Contains(path, ".") && ctx.Value("verified") == nil {
		return fs, nil
	}

	files, err := ioutil.ReadDir(fmt.Sprintf("/go/src/api/storage%s", path))
	if err != nil {
		return nil, err
	}

	for _, file := range files {
		if file.Name()[0:1] == "." && ctx.Value("verified") == nil {
			continue
		}

		if name != nil && strings.Index(strings.ToLower(file.Name()), strings.ToLower(*name)) == -1 {
			continue
		}

		size := int(file.Size())
		updated_at := file.ModTime()

		if file.IsDir() && (isDir == nil || *isDir) {
			ds = append(ds, &model.File{file.Name(), fmt.Sprintf("%s/%s", path, file.Name()), "dir", file.IsDir(), &size, &updated_at})
		} else if !file.IsDir() && (isDir == nil || !*isDir) {
			fs = append(fs, &model.File{file.Name(), fmt.Sprintf("%s/%s", path, file.Name()), GetFileType(file.Name()), file.IsDir(), &size, &updated_at})
		}
	}

	return append(ds, fs...), nil
}

func (_ StorageService) UploadFiles(ctx context.Context, path string, files []*graphql.Upload) ([]*model.File, error) {
	var fs []*model.File

	if strings.Contains(path, ".") && ctx.Value("verified") == nil {
		return nil, errors.New("Token does not exist.")
	}

	for _, file := range files {
		buf, err := ioutil.ReadAll(file.File)
		if err != nil {
			return nil, err
		}

		if err := ioutil.WriteFile(fmt.Sprintf("/go/src/api/storage%s/%s", path, file.Filename), buf, os.ModePerm); err != nil {
			return nil, err
		}
		fs = append(fs, &model.File{file.Filename, fmt.Sprintf("%s/%s", path, file.Filename), file.ContentType[0:strings.Index(file.ContentType, "/")], false, nil, nil})
	}
	return fs, nil
}

func (_ StorageService) MoveFile(ctx context.Context, input []*model.UpdateFileInput) ([]string, error) {
	var keys []string

	for _, info := range input {
		if (strings.Contains(info.Key[0:strings.LastIndex(info.Key, "/")], ".") || strings.Contains(info.Destination[0:strings.LastIndex(info.Destination, "/")], ".")) && ctx.Value("verified") == nil {
			return nil, errors.New("Token does not exist.")
		}
	
		if err := os.Rename(fmt.Sprintf("/go/src/api/storage%s", info.Key), fmt.Sprintf("/go/src/api/storage%s", info.Destination)); err != nil {
			return nil, err
		}

		keys = append(keys, info.Destination)
	}
	return keys, nil
}

func (self StorageService) CopyFile(ctx context.Context, input []*model.UpdateFileInput) ([]string, error) {
	var keys []string

	for _, entry := range input {
		info, err := os.Stat(fmt.Sprintf("/go/src/api/storage%s", entry.Key))
		if err != nil {
			return nil, err
		}
		if info.IsDir() {
			// TODO コピー先がコピー元の子供の場合、無限ループに陥る為の回避.
			if entry.Key != entry.Destination && entry.Key == entry.Destination[:len(entry.Key)] {
				return nil, errors.New("Failed to copy directory.")
			}

			files, err := self.GetFiles(ctx, entry.Key, nil, nil); if err != nil {
				return nil, err
			}

			var key string
			if entry.Key == entry.Destination {
				key, err = self.MakeDir(ctx, entry.Destination + " copy"); if err != nil {
					return nil, err
				}
			} else {
				key, err = self.MakeDir(ctx, entry.Destination); if err != nil {
					return nil, err
				}
			}

			var entries []*model.UpdateFileInput
			for _, file := range files {
				entries = append(entries, &model.UpdateFileInput{(*file).Key, fmt.Sprintf("%s/%s", key, (*file).Name)})
			}
			
			ks, err := self.CopyFile(ctx, entries); if err != nil {
				return nil, err
			}
			keys = append(keys, ks...)
		} else {
			if (strings.Contains(entry.Key[0:strings.LastIndex(entry.Key, "/")], ".") || strings.Contains(entry.Destination[0:strings.LastIndex(entry.Destination, "/")], ".")) && ctx.Value("verified") == nil {
				return nil, errors.New("Token does not exist.")
			}
		
			file, err := os.Open(fmt.Sprintf("/go/src/api/storage%s", entry.Key))
			if err != nil {
				return nil, err
			}
		
			var copy io.Writer
			if entry.Key == entry.Destination {
				copy, err = os.Create(fmt.Sprintf("/go/src/api/storage%s", strings.Replace(entry.Destination, ".", " copy.", 1)))
				if err != nil {
					return nil, err
				}
			} else {
				copy, err = os.Create(fmt.Sprintf("/go/src/api/storage%s", entry.Destination))
				if err != nil {
					return nil, err
				}
			}
		
			io.Copy(copy, file)
			keys = append(keys, entry.Destination)
		}
	}
	return keys, nil
}

func (_ StorageService) MakeDir(ctx context.Context, key string) (string, error) {
	if strings.Contains(key[0:strings.LastIndex(key, "/")], ".") && ctx.Value("verified") == nil {
		return "", errors.New("Token does not exist.")
	}

	if err := os.Mkdir(fmt.Sprintf("/go/src/api/storage%s", key), 0777); err != nil {
		return "", err
	}
	return key, nil
}

func (_ StorageService) RemoveFiles(ctx context.Context, keys []string) ([]string, error) {
	for _, key := range keys {
		if strings.Contains(key[0:strings.LastIndex(key, "/")], ".") && ctx.Value("verified") == nil {
			return nil, errors.New("Token does not exist.")
		}

		if err := os.RemoveAll(fmt.Sprintf("/go/src/api/storage%s", key)); err != nil {
			return nil, err
		}
	}
	return keys, nil
}

type StorageService struct{}
