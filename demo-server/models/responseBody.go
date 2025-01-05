package models

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

const (
	SUCCESS = "SUCCESS"
	FAILED  = "FAILED"
)

type ResponseBody struct {
	Status string       `json:"status"`
	Result interface{}  `json:"result"`
	Error  *fiber.Error `json:"error,omitempty"`
}

func Success(response interface{}) *ResponseBody {
	return &ResponseBody{SUCCESS, response, nil}
}

func Failed(err *fiber.Error) *ResponseBody {
	return &ResponseBody{FAILED, nil, err}
}

type ServiceError struct {
	Code    int
	Message string
}

func (e *ServiceError) Error() string {
	return fmt.Sprintf("Code: %d , Message: %s", e.Code, e.Message)
}

type AddCustomerResponseBody struct {
	Message string `json:"message"`
}

type GetCustomerInformationResponseBody struct {
	Email     string `json:"email"`
	Name      string `json:"name"`
	Plan      string `json:"plan"`
	MasterId  string `json:"master_id"`
	Algorithm string `json:"algorithm"`
	Platform  string `json:"platform"`
	UserId    string `json:"id"`
}

type AcceptContractResponseBody struct {
	Message string `json:"message"`
	LicenseId string `json:"license_id"`
}

type CheckLicenseResponseBody struct {
	Email   string `json:"email"`
}
