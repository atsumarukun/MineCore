package main

import (
	_"api/conf"
	"api/middleware"
	"api/controller"
	"api/graph"
	"api/graph/resolver"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/rs/cors"
)

const defaultPort = "8000"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	mux := http.NewServeMux()
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &resolver.Resolver{}}))
	handler := cors.New(cors.Options{
		AllowedHeaders: []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
	}).Handler(mux)

	mux.Handle("/", playground.Handler("GraphQL playground", "/query"))
	mux.Handle("/query", middleware.AuthMiddleware(srv))
	mux.Handle("/storage/", http.StripPrefix("/storage", http.FileServer(http.Dir("./storage/"))))

	// gqlgenのUploadは30M以上のファイルを通信できないためREST APIで実装.
	ctr := controller.StorageController{}
	mux.HandleFunc("/upload", ctr.UploadFiles)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
