package services

import (
	"errors"
	"productUI/dal"
	"productUI/models"

	"github.com/google/uuid"
)

type Product interface {
	AddCustomer(request *models.ProductDetailRequestBody) (*models.AddCustomerResponseBody, error)
	GetCustomerInformation(email string) (resp *models.GetCustomerInformationResponseBody, err error)
}

type ProductType struct {
	CustomerDB dal.Customer
}

func NewProductRequest() (Product, error) {
	return &ProductType{}, nil
}

func (pt *ProductType) SetupDal() error {
	var err error

	pt.CustomerDB, err = dal.NewDalRequest()
	if err != nil {
		return errors.New("error while creating the dal connection: " + err.Error())
	}
	return nil
}

func (pt *ProductType) AddCustomer(request *models.ProductDetailRequestBody) (*models.AddCustomerResponseBody, error) {
	err := pt.SetupDal()
	if err != nil {
		return nil, err
	}
	customerDetails, err := pt.CustomerDB.FindByEmail(request.Email)
	if err != nil {
		return nil, &models.ServiceError{
			Code:    500,
			Message: "error while the finding the user:" + err.Error(),
		}
	}
	if customerDetails.Email == request.Email {
		return nil, &models.ServiceError{
			Code:    409,
			Message: "User already exists",
		}
	}
	customerErr := pt.CustomerDB.Create(&models.DbCustomer{
		Name:      request.Name,
		Email:     request.Email,
		Algorithm: request.Algorithm,
		Plan:      request.Plan,
		MasterId:  uuid.New(),
		Platform:  request.Platform,
	})
	if customerErr != nil {
		return nil, &models.ServiceError{
			Code:    500,
			Message: customerErr.Error(),
		}
	}
	return &models.AddCustomerResponseBody{
		Message: "Customer added successfully with email " + request.Email,
	}, nil
}

func (pt *ProductType) GetCustomerInformation(email string) (resp *models.GetCustomerInformationResponseBody, err error) {
	err = pt.SetupDal()
	if err != nil {
		return nil, &models.ServiceError{
			Code:    500,
			Message: err.Error(),
		}
	}
	customerInformation, err := pt.CustomerDB.FindByEmail(email)
	if err != nil {
		return nil, &models.ServiceError{
			Code:    500,
			Message: err.Error(),
		}
	}
	if customerInformation.MasterId.String() == "00000000-0000-0000-0000-000000000000" {
		return nil, &models.ServiceError{
			Code:    404,
			Message: "User not found in the database with the email " + email,
		}
	}
	return &models.GetCustomerInformationResponseBody{
		Email:     customerInformation.Email,
		Name:      customerInformation.Name,
		Plan:      customerInformation.Plan,
		MasterId:  customerInformation.MasterId.String(),
		Algorithm: customerInformation.Algorithm,
		Platform:  customerInformation.Platform,
	}, nil
}
