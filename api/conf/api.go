package conf

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

var (
	JwtSecretKey string
)

func init() {
	err := godotenv.Load("/go/src/api/.env")
	if err != nil {
		log.Println("Error loading .env file")
	}

	JwtSecretKey = os.Getenv("JWT_SECRET_KEY")
}