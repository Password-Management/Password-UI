package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type DbCustomer struct {
	Id        uuid.UUID `gorm:"primaryKey,column:id"`
	Name      string    `gorm:"column:name;type:varchar(100);not null"`
	Email     string    `gorm:"column:email;type:varchar(100);not null"`
	Plan      string    `gorm:"column:plan;type:varchar(100);not null"`
	MasterId  uuid.UUID `gorm:"column:master_id;type:uuid;not null"`
	Platform  string    `gorm:"column:platform;type:varchar(100);not null"`
	Algorithm string    `gorm:"column:algorithm;type:varchar(100);not null"`
}

func (DbCustomer) TableName() string {
	return "customer_tbl"
}

func (*DbCustomer) BeforeCreate(tx *gorm.DB) error {
	uuid := uuid.New().String()
	tx.Statement.SetColumn("Id", uuid)
	return nil
}

type DbLicense struct {
	Id        uuid.UUID `gorm:"primaryKey,column:id"`
	UserId    uuid.UUID `gorm:"column:user_id;type:uuid;not null"`
	Email     string    `gorm:"column:email;type:varchar(100);not null"`
	LicenseId uuid.UUID `gorm:"column:license_id;type:uuid;not null"`
	Contract  string    `gorm:"type:text"`
	Accepted  bool      `gorm:"column:accepted"`
}

func (DbLicense) TableName() string {
	return "license_tbl"
}

func (*DbLicense) BeforeCreate(tx *gorm.DB) error {
	uuid := uuid.New().String()
	tx.Statement.SetColumn("Id", uuid)
	return nil
}
