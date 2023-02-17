package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type UserToRegister struct {
	Id        primitive.ObjectID `json:"_id,omitempty"`
	Name      string             `json:"name,omitempty" validate:"required"`
	Surname   string             `json:"surname,omitempty" validate:"required"`
	Tag       string             `json:"tag,omitempty" validate:"required"`
	Email     string             `json:"email,omitempty" validate:"required"`
	Password  string             `json:"password,omitempty" validate:"required"`
	Confirm   string             `json:"confirm,omitempty" validate:"required"`
	CreatedAt primitive.DateTime `json:"created_at,omitempty"`
	UpdatedAt primitive.DateTime `json:"updated_at,omitempty"`
}

type User struct {
	Id        primitive.ObjectID `json:"_id,omitempty"`
	Name      string             `json:"name,omitempty" validate:"required"`
	Surname   string             `json:"surname,omitempty" validate:"required"`
	Tag       string             `json:"tag,omitempty" validate:"required"`
	Email     string             `json:"email,omitempty" validate:"required"`
	Password  string             `json:"password,omitempty" validate:"required"`
	CreatedAt primitive.DateTime `json:"created_at,omitempty"`
	UpdatedAt primitive.DateTime `json:"updated_at,omitempty"`
}

type UserLogged struct {
	Id       primitive.ObjectID `json:"_id,omitempty"`
	Email    string             `json:"email,omitempty" validate:"required"`
	Password string             `json:"password,omitempty" validate:"required"`
}
