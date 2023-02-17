package validation

import (
	"net/mail"

	"github.com/EmanuelCav/critics/models"
	"github.com/gofiber/fiber/v2"
)

func ValidationUser(c *fiber.Ctx, user models.UserToRegister) (error, bool) {

	if user.Name == "" || user.Surname == "" || user.Tag == "" || user.Email == "" || user.Password == "" || user.Confirm == "" {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": "There are empty fields.",
			}),
			false
	}

	if len(user.Password) < 7 {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": "Try your password has more than 7 characters.",
			}),
			false
	}

	if user.Password != user.Confirm {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": "Passwords do not match.",
			}),
			false
	}

	if len(user.Name) > 40 {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": "Try your name has less than 40 characters.",
			}),
			false
	}
	if len(user.Surname) > 40 {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": "Try your surname has less than 40 characters.",
			}),
			false
	}
	if len(user.Tag) > 40 {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": "Try your tag has less than 40 characters.",
			}),
			false
	}

	if !EmailValid(user.Email) {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": "That email is not valid.",
			}),
			false
	}

	return nil, true

}

func EmailValid(email string) bool {
	_, err := mail.ParseAddress(email)
	return err == nil
}
