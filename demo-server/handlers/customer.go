package handlers

import (
	"errors"
	"log"
	"productUI/models"

	"github.com/gofiber/fiber/v2"
)

func (h *Handler) AddNewCustomer(c *fiber.Ctx) error {
	var requestBody *models.ProductDetailRequestBody
	err := c.BodyParser(&requestBody)
	if err != nil {
		log.Println("Error in parsing the request Body" + err.Error())
		return c.Status(fiber.StatusBadGateway).JSON(errors.New("error while parsing the request Body"))
	}
	if requestBody.Algorithm == "" || requestBody.Email == "" || requestBody.Name == "" {
		return c.Status(fiber.ErrBadRequest.Code).JSON(errors.New("the name, algorithm or email is empty, please check your request body"))
	}
	resp, err := h.ProductTypeService.AddCustomer(requestBody)
	if err != nil {
		if serviceErr, ok := err.(*models.ServiceError); ok {
			return c.Status(serviceErr.Code).JSON(serviceErr)
		}
		return c.Status(fiber.StatusInternalServerError).JSON(&models.ServiceError{
			Code:    500,
			Message: err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(models.Success(resp))
}

func (h *Handler) GetCustomerInformation(c *fiber.Ctx) error {
	email := c.Query("email")
	if email == "" {
		return c.Status(400).JSON(errors.New("error while parsing the request Body"))
	}
	resp, err := h.ProductTypeService.GetCustomerInformation(email)
	if err != nil {
		if serviceErr, ok := err.(*models.ServiceError); ok {
			return c.Status(serviceErr.Code).JSON(serviceErr)
		}
		return c.Status(fiber.StatusInternalServerError).JSON(&models.ServiceError{
			Code:    500,
			Message: err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(models.Success(resp))
}
