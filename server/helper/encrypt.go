package helper

import (
	"log"

	"golang.org/x/crypto/bcrypt"
)

func GenerateHash(password string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), 14)

	if err != nil {
		log.Fatal(err)
	}

	return string(hash)
}

func CompareHash(hash string, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
