package dal

import (
	"log"
	"productUI/db"
	"productUI/models"
)

func NewLicenseDalRequest() (License, error) {
	return &LicenseImpl{}, nil
}

type LicenseImpl struct{}

type License interface {
	Create(value *models.DbLicense) error
	FindBy(conditions *models.DbLicense) (response *models.DbLicense, err error)
	Update(value *models.DbLicense) error
}

func (l *LicenseImpl) Create(value *models.DbLicense) error {
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

func (l *LicenseImpl) FindBy(conditions *models.DbLicense) (response *models.DbLicense, err error){
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
		return  nil, transaction.Error
	}
	defer transaction.Rollback()
	finderr := transaction.Find(&response, &conditions)
	if finderr.Error != nil {
		return nil, finderr.Error
	}
	return response, nil
} 

func (l *LicenseImpl) Update(value *models.DbLicense) error {
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
	terr := transaction.Save(&value)
	if terr.Error != nil {
		return terr.Error
	}
	transaction.Commit()
	return nil
}