package controller

import (
	"context"
	"time"

	"github.com/EmanuelCav/critics/database"
	"github.com/EmanuelCav/critics/models"
	"github.com/EmanuelCav/critics/validation"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var connectionCritics = database.GetCollection("critics")

func Critics(c *fiber.Ctx) error {

	var critics []models.Critic

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	results, err := connectionCritics.Find(ctx, bson.M{})

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err,
		})
	}

	defer results.Close(ctx)

	for results.Next(ctx) {
		var critic models.Critic

		err2 := results.Decode(&critic)

		if err2 != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": err2,
			})
		}

		critics = append(critics, critic)
	}

	return c.Status(fiber.StatusAccepted).JSON(critics)
}

func MyCritics(c *fiber.Ctx) error {

	var critics []models.Critic

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["id"].(string)

	results, err := connectionCritics.Find(ctx, bson.M{"userid": userId})

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err,
		})
	}

	defer results.Close(ctx)

	for results.Next(ctx) {
		var critic models.Critic

		err2 := results.Decode(&critic)

		if err2 != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": err2,
			})
		}

		critics = append(critics, critic)
	}

	return c.Status(fiber.StatusAccepted).JSON(critics)
}

func Critic(c *fiber.Ctx) error {

	var critic models.Critic

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	id := c.Params("id")

	criticId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err,
		})
	}

	err2 := connectionCritics.FindOne(ctx, bson.M{"id": criticId}).Decode(&critic)

	if err2 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err2,
		})
	}

	return c.Status(fiber.StatusAccepted).JSON(critic)
}

func GetCategory(c *fiber.Ctx) error {

	var critics []models.Critic

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	category := c.Params("category")

	results, err := connectionCritics.Find(ctx, bson.M{"category": category})

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err,
		})
	}

	defer results.Close(ctx)

	for results.Next(ctx) {
		var critic models.Critic

		err2 := results.Decode(&critic)

		if err2 != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": err2,
			})
		}

		critics = append(critics, critic)
	}

	return c.Status(fiber.StatusAccepted).JSON(critics)
}

func CreateCritic(c *fiber.Ctx) error {

	var critic models.Critic

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err := c.BodyParser(&critic)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err,
		})
	}

	errValid, isValid := validation.ValidationCritic(c, critic)

	if !isValid {
		return errValid
	}

	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["id"].(string)

	newCritic := models.Critic{
		Id:          primitive.NewObjectID(),
		Issue:       critic.Issue,
		Description: critic.Description,
		Content:     critic.Content,
		Category:    critic.Category,
		UserId:      userId,
		CreatedAt:   primitive.NewDateTimeFromTime(time.Now()),
		UpdatedAt:   primitive.NewDateTimeFromTime(time.Now()),
	}

	_, err2 := connectionCritics.InsertOne(ctx, newCritic)

	if err2 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err2,
		})
	}

	return c.Status(fiber.StatusAccepted).JSON(newCritic)

}

func RemoveCritic(c *fiber.Ctx) error {

	var critic models.Critic

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	id := c.Params("id")

	criticId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err,
		})
	}

	err2 := connectionCritics.FindOneAndDelete(ctx, bson.M{"id": criticId}).Decode(&critic)

	if err2 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err2,
		})
	}

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"message": "Critic removed successfully",
	})
}

func UpdateCritic(c *fiber.Ctx) error {

	var critic models.Critic

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	id := c.Params("id")

	criticId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err,
		})
	}

	err2 := connectionCritics.FindOne(ctx, bson.M{"id": criticId}).Decode(&critic)

	if err2 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err2,
		})
	}

	var updatedCritic models.Critic
	err3 := c.BodyParser(&updatedCritic)

	if err3 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err3,
		})
	}

	errValid, isValid := validation.ValidationCritic(c, updatedCritic)

	if !isValid {
		return errValid
	}

	newUpdate := models.Critic{
		Id:          critic.Id,
		Issue:       updatedCritic.Issue,
		Description: updatedCritic.Description,
		Content:     updatedCritic.Content,
		Category:    updatedCritic.Category,
		UserId:      critic.UserId,
		CreatedAt:   critic.CreatedAt,
		UpdatedAt:   primitive.NewDateTimeFromTime(time.Now()),
	}

	err4 := connectionCritics.FindOneAndUpdate(ctx, bson.M{"id": criticId}, bson.M{"$set": newUpdate}).Decode(&updatedCritic)

	if err4 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err4.Error(),
		})
	}

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"critic": newUpdate,
	})
}
