package resolver

import (
	"api/graph"
	"api/graph/model"
	"api/graph/service"
	"context"

	"github.com/99designs/gqlgen/graphql"
)

func (r *mutationResolver) UploadFiles(ctx context.Context, path string, files []*graphql.Upload) ([]*model.File, error) {
	serv := service.StorageService{}
	return serv.UploadFiles(path, files)
}

func (r *mutationResolver) MoveFile(ctx context.Context, key string, destination string) (string, error) {
	serv := service.StorageService{}
	return serv.MoveFile(key, destination)
}

func (r *mutationResolver) RemoveFiles(ctx context.Context, keys []string) ([]string, error) {
	serv := service.StorageService{}
	return serv.RemoveFiles(keys)
}

func (r *queryResolver) Files(ctx context.Context, path string, isDir *bool) ([]*model.File, error) {
	serv := service.StorageService{}
	return serv.GetFiles(path, isDir)
}

func (r *Resolver) Mutation() graph.MutationResolver { return &mutationResolver{r} }

func (r *Resolver) Query() graph.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
