package db

import (
	"fmt"
	"log"
	"os"
	"productUI/helpers"
	"productUI/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type IDataBaseService interface {
	InitDB() (*gorm.DB, error)
}

type DataBaseService struct {
	Db *gorm.DB
}

func NewDbRequest() (IDataBaseService, error) {
	return &DataBaseService{}, nil
}

func (db *DataBaseService) InitDB() (*gorm.DB, error) {
	helpers.Getenv()
	dsn := os.Getenv("DSN")
	var err error
	log.Println("DSN:", dsn)
	conn, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		log.Println("the error while creating the database connection: ", err.Error())
		return nil, err
	}

	db.Db = conn
	db.Db.Exec("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
	err = db.Db.AutoMigrate(&models.DbCustomer{}, &models.DbLicense{})
	if err != nil {
		log.Println("error in the migration")
		return nil, fmt.Errorf("failed to migrate database: %w", err)
	}
	fmt.Println("Database migration completed successfully. Database connection successfull.")
	return conn, nil
}
