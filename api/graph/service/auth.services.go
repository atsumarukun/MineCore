package service

import (
	"api/conf"
	"io/ioutil"
	"time"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

func (_ AuthService) Auth(password string) (string, error) {
	pass, err := ioutil.ReadFile("/go/src/api/Password")
	if err != nil {
		return "", err
	}

	if err := bcrypt.CompareHashAndPassword(pass, []byte(password)); err != nil {
		return "", err
	}

	claims := jwt.MapClaims{
		"verified": true,
		"exp": time.Now().Add(time.Hour * 1).Unix(),
	}
	jwt := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	token, err := jwt.SignedString([]byte(conf.JwtSecretKey))
	if err != nil {
		return "", err
	}

	return token, nil
}

type AuthService struct{}