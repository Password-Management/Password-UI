package services

import (
	"errors"
	"productUI/dal"
	"productUI/helpers"
	"productUI/models"
	"strings"
	"time"

	"github.com/google/uuid"
)

type Product interface {
	AddCustomer(request *models.ProductDetailRequestBody) (*models.AddCustomerResponseBody, error)
	GetCustomerInformation(email string) (resp *models.GetCustomerInformationResponseBody, err error)
	GetContract(userId string) (string, error)
	CreateContract(email string) error
	AcceptContract(userId string) (*models.AcceptContractResponseBody, error)
	CheckLicense(licenseId string) (*models.CheckLicenseResponseBody, error)
}

type ProductType struct {
	CustomerDB dal.Customer
	LicenseDB  dal.License
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

	pt.LicenseDB, err = dal.NewLicenseDalRequest()
	if err != nil {
		return errors.New("error while creating the dal connection with LicenseDb: " + err.Error())
	}
	return nil
}

func (pt *ProductType) AddCustomer(request *models.ProductDetailRequestBody) (*models.AddCustomerResponseBody, error) {
	err := pt.SetupDal()
	if err != nil {
		return nil, err
	}
	customerDetails, err := pt.CustomerDB.FindBy(&models.DbCustomer{
		Email: request.Email,
	})
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
	customerInformation, err := pt.CustomerDB.FindBy(&models.DbCustomer{
		Email: email,
	})
	if err != nil {
		return nil, &models.ServiceError{
			Code:    500,
			Message: err.Error(),
		}
	}
	if customerInformation.MasterId.String() == "00000000-0000-0000-0000-000000000000" {
		return nil, &models.ServiceError{
			Code:    404,
			Message: "User not found with the given Id",
		}
	}
	return &models.GetCustomerInformationResponseBody{
		Email:     customerInformation.Email,
		Name:      customerInformation.Name,
		Plan:      customerInformation.Plan,
		MasterId:  customerInformation.MasterId.String(),
		Algorithm: customerInformation.Algorithm,
		Platform:  customerInformation.Platform,
		UserId:    customerInformation.Id.String(),
	}, nil
}

func (pt *ProductType) CreateContract(email string) error {
	err := pt.SetupDal()
	if err != nil {
		return &models.ServiceError{
			Code:    500,
			Message: err.Error(),
		}
	}
	customerInformation, err := pt.CustomerDB.FindBy(&models.DbCustomer{
		Email: email,
	})
	if err != nil {
		return &models.ServiceError{
			Code:    500,
			Message: err.Error(),
		}
	}
	if customerInformation.MasterId.String() == "00000000-0000-0000-0000-000000000000" {
		return &models.ServiceError{
			Code:    404,
			Message: "User not found with the given Id",
		}
	}
	userCount := GetUserCount(strings.ToLower(customerInformation.Plan))
	if userCount == "" {
		return &models.ServiceError{
			Code:    500,
			Message: "Check the Database",
		}
	}
	currentTime := time.Now()
	formattedTime := currentTime.Format("02-01-06")
	resp, err := pt.LicenseDB.FindBy(&models.DbLicense{
		UserId: customerInformation.Id,
	})
	if err != nil {
		return &models.ServiceError{
			Code:    500,
			Message: err.Error(),
		}
	}
	if resp.UserId == customerInformation.Id {
		return &models.ServiceError{
			Code:    409,
			Message: "Contract already exists",
		}
	}
	data, err := helpers.TemplateParser(&models.TemaplateBody{
		CustomerEmail: customerInformation.Email,
		CustomerName:  customerInformation.Name,
		Platform:      customerInformation.Platform,
		Algorithm:     customerInformation.Algorithm,
		User:          userCount,
		Date:          formattedTime,
	})
	if err != nil {
		return &models.ServiceError{
			Code:    400,
			Message: "Error creating the contract",
		}
	}
	liceseErr := pt.LicenseDB.Create(&models.DbLicense{
		UserId:    customerInformation.Id,
		LicenseId: uuid.New(),
		Email:     customerInformation.Email,
		Contract:  data,
	})
	if liceseErr != nil {
		return &models.ServiceError{
			Code:    500,
			Message: liceseErr.Error(),
		}
	}
	return nil
}

func GetUserCount(user string) string {
	if user == "basic plan" {
		return "10"
	} else if user == "pro plan " {
		return "50"
	} else if user == "premium plan" {
		return "100"
	}
	return ""
}

func (pt *ProductType) GetContract(userId string) (string, error) {
	err := pt.SetupDal()
	if err != nil {
		return "", &models.ServiceError{
			Code:    500,
			Message: err.Error(),
		}
	}
	resp, err := pt.LicenseDB.FindBy(&models.DbLicense{
		UserId: uuid.MustParse(userId),
	})
	if err != nil {
		return "", &models.ServiceError{
			Code:    500,
			Message: err.Error(),
		}
	}
	return resp.Contract, nil
}

func (pt *ProductType) AcceptContract(userId string) (*models.AcceptContractResponseBody, error) {
	err := pt.SetupDal()
	if err != nil {
		return nil, &models.ServiceError{
			Code:    500,
			Message: err.Error(),
		}
	}
	resp, err := pt.LicenseDB.FindBy(&models.DbLicense{
		UserId: uuid.MustParse(userId),
	})
	if err != nil {
		return nil, &models.ServiceError{
			Code:    500,
			Message: err.Error(),
		}
	}
	resp.Accepted = true
	updateErr := pt.LicenseDB.Update(resp)
	if updateErr != nil {
		return nil, &models.ServiceError{
			Code:    500,
			Message: "error while updating the database: " + updateErr.Error(),
		}
	}
	return &models.AcceptContractResponseBody{
		Message:   "Contract Accepted Successfully",
		LicenseId: resp.LicenseId.String(),
	}, nil
}

func (pt *ProductType) CheckLicense(licenseId string) (*models.CheckLicenseResponseBody, error) {
	err := pt.SetupDal()
	if err != nil {
		return nil, &models.ServiceError{
			Code:    500,
			Message: err.Error(),
		}
	}
	licenseInfo, err := pt.LicenseDB.FindBy(&models.DbLicense{
		LicenseId: uuid.MustParse(licenseId),
	})
	if err != nil {
		return nil, &models.ServiceError{
			Code:    500,
			Message: "error while retriving the license info: " + err.Error(),
		}
	}
	if licenseInfo.LicenseId != uuid.MustParse(licenseId) {
		return nil, &models.ServiceError{
			Code:    400,
			Message: "License Id not found",
		}
	}
	return &models.CheckLicenseResponseBody{
		Email: licenseInfo.Email,
	}, nil
}
