package dal

import (
	"log"
	"productUI/db"
	"productUI/models"
)

func NewDalRequest() (Customer, error) {
	return &CustomerImpl{}, nil
}

type CustomerImpl struct{}

type Customer interface {
	Create(value *models.DbCustomer) error
	FindByEmail(email string) (response *models.DbCustomer, err error)
}

func (cus *CustomerImpl) Create(value *models.DbCustomer) error {
	db, err := db.NewDbRequest()
	if err != nil {
		log.Println("error in creating a DB request")
		return err
	}
	dbConn, err := db.InitDB()
	if err != nil {
		return err
	}
	transaction := dbConn.Begin()
	if transaction.Error != nil {
		return transaction.Error
	}
	defer transaction.Rollback()
	customerAddition := transaction.Create(&value)
	if customerAddition.Error != nil {
		return customerAddition.Error
	}
	transaction.Commit()
	return nil
}

func (cus *CustomerImpl) FindByEmail(email string) (response *models.DbCustomer, err error) {
	db, err := db.NewDbRequest()
	if err != nil {
		log.Println("error in creating a DB request")
		return nil, err
	}
	dbConn, err := db.InitDB()
	if err != nil {
		return nil, err
	}
	transaction := dbConn.Begin()
	if transaction.Error != nil {
		return nil, transaction.Error
	}
	defer transaction.Rollback()
	customerDetails := transaction.Find(&response, models.DbCustomer{
		Email: email,
	})
	if customerDetails.Error != nil {
		return nil, customerDetails.Error
	}
	return response, nil
}
