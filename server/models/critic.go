package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Critic struct {
	Id          primitive.ObjectID `json:"_id,omitempty"`
	Issue       string             `json:"issue,omitempty" validate:"required"`
	Description string             `json:"description,omitempty" validate:"required"`
	Content     string             `json:"content,omitempty" validate:"required"`
	Category    string             `json:"category,omitempty" validate:"required"`
	UserId      string             `json:"userId,omitempty" validate:"required"`
	CreatedAt   primitive.DateTime `json:"created_at,omitempty"`
	UpdatedAt   primitive.DateTime `json:"updated_at,omitempty"`
}
