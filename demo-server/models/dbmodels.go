package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type DbCustomer struct {
	Id        uuid.UUID `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Plan      string    `json:"plan"`
	MasterId  uuid.UUID `json:"master_id"`
	Platform  string    `json:"platform"`
	Algorithm string    `json:"algorithm"`
}

func (DbCustomer) TableName() string {
	return "customer_tbl"
}

func (*DbCustomer) BeforeCreate(tx *gorm.DB) error {
	uuid := uuid.New().String()
	tx.Statement.SetColumn("Id", uuid)
	return nil
}
