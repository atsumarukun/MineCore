package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.36

import (
	"api/graph"
	"api/graph/model"
	"api/graph/service"
	"context"
)

// Files is the resolver for the files field.
func (r *queryResolver) Files(ctx context.Context, path string) ([]*model.File, error) {
	serv := service.StorageService{}
	return serv.GetFiles(path)
}

// Query returns graph.QueryResolver implementation.
func (r *Resolver) Query() graph.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
