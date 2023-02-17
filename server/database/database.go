package database

import (
	"context"
	"log"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func DatabaseConnection(uri string) *mongo.Client {

	envFile, _ := godotenv.Read(".env")

	client, err := mongo.NewClient(options.Client().ApplyURI(envFile["URI"]))

	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err2 := client.Connect(ctx)

	if err2 != nil {
		log.Fatal(err2)
	}

	err3 := client.Ping(ctx, nil)

	if err3 != nil {
		log.Fatal(err3)
	}

	log.Println("Database is running")
	return client
}
