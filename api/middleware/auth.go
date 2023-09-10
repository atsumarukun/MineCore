package middleware

import (
	"context"
	"api/conf"
	"strings"
	"net/http"

	"github.com/dgrijalva/jwt-go"
)

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		authorization := req.Header.Get("Authorization")
		if authorization == "undefined" {
			next.ServeHTTP(w, req)
			return
		}

		token, err := jwt.Parse(authorization[strings.Index(authorization, " ") + 1:], func(token *jwt.Token) (interface{}, error) {
			return []byte(conf.JwtSecretKey), nil
		})
		if err != nil {
			next.ServeHTTP(w, req)
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			ctx := context.WithValue(req.Context(), "verified", claims["verified"].(bool))
			next.ServeHTTP(w, req.WithContext(ctx))
		} else {
			next.ServeHTTP(w, req)
		}
	})
}