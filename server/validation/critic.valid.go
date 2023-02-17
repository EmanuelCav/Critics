package validation

import (
	"github.com/EmanuelCav/critics/models"
	"github.com/gofiber/fiber/v2"
)

func ValidationCritic(c *fiber.Ctx, critic models.Critic) (error, bool) {

	if critic.Issue == "" || critic.Description == "" || critic.Content == "" || critic.Category == "" {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": "There are empty fields.",
			}),
			false
	}

	if len(critic.Issue) > 75 {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": "Try critic issue has less than 75 characters.",
			}),
			false
	}
	if len(critic.Description) > 200 {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": "Try critic description has less than 200 characters.",
			}),
			false
	}

	return nil, true

}
