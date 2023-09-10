package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.36

import (
	"api/graph"
	"api/graph/service"
	"context"
)

// Auth is the resolver for the auth field.
func (r *mutationResolver) Auth(ctx context.Context, password string) (string, error) {
	serv := service.AuthService{}
	return serv.Auth(password)
}

// Mutation returns graph.MutationResolver implementation.
func (r *Resolver) Mutation() graph.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }