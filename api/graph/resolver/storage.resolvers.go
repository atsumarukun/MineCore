package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.36

import (
	"api/graph"
	"api/graph/model"
	"api/graph/service"
	"context"

	"github.com/99designs/gqlgen/graphql"
)

// UploadFiles is the resolver for the uploadFiles field.
func (r *mutationResolver) UploadFiles(ctx context.Context, path string, files []*graphql.Upload) ([]*model.File, error) {
	serv := service.StorageService{}
	return serv.UploadFiles(ctx, path, files)
}

// MoveFile is the resolver for the moveFile field.
func (r *mutationResolver) MoveFile(ctx context.Context, input []*model.UpdateFileInput) ([]string, error) {
	serv := service.StorageService{}
	return serv.MoveFile(ctx, input)
}

// CopyFile is the resolver for the copyFile field.
func (r *mutationResolver) CopyFile(ctx context.Context, input []*model.UpdateFileInput) ([]string, error) {
	serv := service.StorageService{}
	var entries []*service.CopyFileInput
	for _, entry := range input {
		entries = append(entries, &service.CopyFileInput{entry.Key, entry.Destination, entry.Destination})
	}
	return serv.CopyFile(ctx, entries)
}

// MakeDir is the resolver for the makeDir field.
func (r *mutationResolver) MakeDir(ctx context.Context, key string) (string, error) {
	serv := service.StorageService{}
	return serv.MakeDir(ctx, key)
}

// RemoveFiles is the resolver for the removeFiles field.
func (r *mutationResolver) RemoveFiles(ctx context.Context, keys []string) ([]string, error) {
	serv := service.StorageService{}
	return serv.RemoveFiles(ctx, keys)
}

// Files is the resolver for the files field.
func (r *queryResolver) Files(ctx context.Context, path string, name *string, isDir *bool) ([]*model.File, error) {
	serv := service.StorageService{}
	return serv.GetFiles(ctx, path, name, isDir)
}

// Query returns graph.QueryResolver implementation.
func (r *Resolver) Query() graph.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
