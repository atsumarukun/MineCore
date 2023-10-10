package conf

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

var (
	JwtSecretKey string
	HostName string
	HostPort string
	HostUser string
)

func init() {
	err := godotenv.Load("/go/src/api/.env")
	if err != nil {
		log.Println(err)
	}

	JwtSecretKey = os.Getenv("JWT_SECRET_KEY")

	HostName = os.Getenv("HOST_NAME")
	HostPort = os.Getenv("HOST_PORT")
	HostUser = os.Getenv("HOST_USER")
}