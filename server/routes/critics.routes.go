package routes

import (
	"github.com/EmanuelCav/critics/controller"
	"github.com/EmanuelCav/critics/middleware"
	"github.com/gofiber/fiber/v2"
)

func CriticsRoutes(app *fiber.App) {
	app.Get("/critics", controller.Critics)
	app.Get("/mycritics", middleware.Auth(), controller.MyCritics)
	app.Get("/critics/:id", controller.Critic)
	app.Get("/criticscategory/:category", controller.GetCategory)
	app.Post("/createcritic", middleware.Auth(), controller.CreateCritic)
	app.Delete("/critics/:id", middleware.Auth(), controller.RemoveCritic)
	app.Put("/critics/:id", middleware.Auth(), controller.UpdateCritic)
}
