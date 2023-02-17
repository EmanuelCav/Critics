package routes

import (
	"github.com/EmanuelCav/critics/controller"
	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app *fiber.App) {
	app.Get("/users", controller.Users)
	app.Post("/register", controller.Register)
	app.Post("/login", controller.Login)
	app.Delete("users/:id", controller.RemoveUser)
}
