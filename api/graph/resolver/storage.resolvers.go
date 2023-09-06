package resolver

import (
	"api/graph"
	"api/graph/model"
	"api/graph/service"
	"context"
	"fmt"

	"github.com/99designs/gqlgen/graphql"
)

// UploadFiles is the resolver for the uploadFiles field.
func (r *mutationResolver) UploadFiles(ctx context.Context, input []*graphql.Upload) ([]*model.File, error) {
	for _, file := range input {
		fmt.Println("%s", file.Filename)
	}

	serv := service.StorageService{}
	return serv.GetFiles("")
}

func (r *queryResolver) Files(ctx context.Context, path string) ([]*model.File, error) {
	serv := service.StorageService{}
	return serv.GetFiles(path)
}

func (r *Resolver) Mutation() graph.MutationResolver { return &mutationResolver{r} }

func (r *Resolver) Query() graph.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
