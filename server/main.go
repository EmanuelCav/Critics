package main

import (
	"os"

	"github.com/EmanuelCav/critics/database"
	"github.com/EmanuelCav/critics/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

func main() {

	app := fiber.New()

	godotenv.Load()

	database.DatabaseConnection(os.Getenv("URI"))

	app.Use(logger.New())
	app.Use(cors.New())

	routes.CriticsRoutes(app)
	routes.UserRoutes(app)

	app.Listen(":" + os.Getenv("PORT"))

}
