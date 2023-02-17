package controller

import (
	"context"
	"time"

	"github.com/EmanuelCav/critics/database"
	"github.com/EmanuelCav/critics/helper"
	"github.com/EmanuelCav/critics/models"
	"github.com/EmanuelCav/critics/validation"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var connectionUsers = database.GetCollection("users")

var envFile, _ = godotenv.Read(".env")

func Users(c *fiber.Ctx) error {

	var users []models.User

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	results, err := connectionUsers.Find(ctx, bson.M{})

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err,
		})
	}

	defer results.Close(ctx)

	for results.Next(ctx) {
		var user models.User
		err2 := results.Decode(&user)

		if err2 != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": err,
			})
		}

		users = append(users, user)
	}

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"user": users,
	})
}

func Register(c *fiber.Ctx) error {

	var user models.User
	var userToRegister models.UserToRegister

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err := c.BodyParser(&user)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err,
		})
	}

	err = c.BodyParser(&userToRegister)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err,
		})
	}

	errValid, isValid := validation.ValidationUser(c, userToRegister)

	if !isValid {
		return errValid
	}

	user.Password = helper.GenerateHash(user.Password)

	newUser := models.User{
		Id:        primitive.NewObjectID(),
		Name:      user.Name,
		Surname:   user.Surname,
		Email:     user.Email,
		Password:  user.Password,
		Tag:       user.Tag,
		CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
		UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
	}

	_, err2 := connectionUsers.InsertOne(ctx, newUser)

	if err2 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err,
		})
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":        user.Id,
		"ExpiresAt": time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err3 := token.SignedString([]byte(envFile["JWTSECRET"]))

	if err3 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err,
		})
	}

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"user":  newUser,
		"token": tokenString,
	})
}

func Login(c *fiber.Ctx) error {

	var user models.UserLogged

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err := c.BodyParser(&user)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err,
		})
	}

	if user.Email == "" || user.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "There are empty fields.",
		})
	}

	var userLogged models.User

	err2 := connectionUsers.FindOne(ctx, bson.M{"email": user.Email}).Decode(&userLogged)

	if err2 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "User does not exists.",
		})
	}

	isValid := helper.CompareHash(userLogged.Password, user.Password)

	if !isValid {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "Fields do not match.",
		})
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":        userLogged.Id,
		"expiresAt": time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err3 := token.SignedString([]byte(envFile["SECRETJWT"]))

	if err3 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err3,
		})
	}

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"user":  userLogged,
		"token": tokenString,
	})
}

func RemoveUser(c *fiber.Ctx) error {

	var user models.User

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	id := c.Params("id")

	userId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err,
		})
	}

	err2 := connectionUsers.FindOneAndDelete(ctx, bson.M{"id": userId}).Decode(&user)

	if err2 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err2,
		})
	}

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"message": "User removed successfully",
	})
}
