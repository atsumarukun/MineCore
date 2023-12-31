package service

import (
	"api/graph/model"
	"encoding/base64"
	"archive/zip"
	"io/ioutil"
	"net/url"
	"strings"
	"context"
	"errors"
	"bytes"
	"fmt"
	"io"
	"os"
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

func ZipCompression(key string, dir string, writer *zip.Writer) error {
	file, err := os.Stat(fmt.Sprintf("/go/src/api/storage%s", key)); if err != nil {
		return err
	}

	if file.IsDir() {
		files, err := ioutil.ReadDir(fmt.Sprintf("/go/src/api/storage%s", key)); if err != nil {
			return err
		}

		for _, f := range files {
			ZipCompression(fmt.Sprintf("%s/%s", key, f.Name()), fmt.Sprintf("%s/%s", dir, file.Name()), writer)
		}
	} else {
		header, err := zip.FileInfoHeader(file); if err != nil {
			return err
		}
		header.Name = fmt.Sprintf("%s/%s", dir, file.Name())
		f, err := writer.CreateHeader(header); if err != nil {
			return err
		}

		data, err := os.ReadFile(fmt.Sprintf("/go/src/api/storage%s", key)); if err != nil {
			return err
		}
		_, err = f.Write(data); if err != nil {
			return err
		}
	}
	return nil
}

func (_ StorageService) DownloadFiles(ctx context.Context, keys []string) (*model.Download, error) {
	buf := new(bytes.Buffer)
	writer := zip.NewWriter(buf)

	if len(keys) == 1 {
		if strings.Contains(keys[0][0:strings.LastIndex(keys[0], "/")], ".") && ctx.Value("verified") == nil {
			return nil, errors.New("Token does not exist.")
		}
		
		file, err := os.Stat(fmt.Sprintf("/go/src/api/storage%s", keys[0])); if err != nil {
			return nil, err
		}

		if !file.IsDir() {
			buf, err := os.ReadFile(fmt.Sprintf("/go/src/api/storage%s", keys[0])); if err != nil {
				return nil, err
			}
			return &model.Download{file.Name(), base64.StdEncoding.EncodeToString(buf)}, nil
		}
	}

	for _, key := range keys {
		if strings.Contains(key[0:strings.LastIndex(key, "/")], ".") && ctx.Value("verified") == nil {
			return nil, errors.New("Token does not exist.")
		}

		err := ZipCompression(key, "", writer); if err != nil {
			return nil, err
		}
	}

	err := writer.Close(); if err != nil {
		return nil, err
	}

	return &model.Download{"downloads.zip", base64.StdEncoding.EncodeToString(buf.Bytes())}, nil
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

// コピー先がコピー元以下の場合無限ループに陥るため最上位ディレクトリのコピー先を保存.
type CopyFileInput struct{
	Key string
	Destination string
	RootDestination string
}

func (self StorageService) CopyFile(ctx context.Context, input []*CopyFileInput) ([]string, error) {
	var keys []string

	for _, entry := range input {
		info, err := os.Stat(fmt.Sprintf("/go/src/api/storage%s", entry.Key))
		if err != nil {
			return nil, err
		}
		if info.IsDir() {
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

			var entries []*CopyFileInput
			for _, file := range files {
				if (*file).Key != entry.RootDestination {
					entries = append(entries, &CopyFileInput{(*file).Key, fmt.Sprintf("%s/%s", key, (*file).Name), entry.RootDestination})
				}
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
