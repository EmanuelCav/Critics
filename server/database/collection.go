package database

import (
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetCollection(collectionName string) *mongo.Collection {

	envFile, _ := godotenv.Read(".env")

	collection := DatabaseConnection(envFile["URI"]).Database(envFile["DATABASE"]).Collection(collectionName)
	return collection
}
