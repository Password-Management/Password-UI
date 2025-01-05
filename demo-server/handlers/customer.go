package handlers

import (
	"errors"
	"log"
	"os"
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

func (h *Handler) CreateContract(c *fiber.Ctx) error {
	email := c.Query("email")
	if email == "" {
		return c.Status(400).JSON(errors.New("error while parsing the request Body"))
	}
	err := h.ProductTypeService.CreateContract(email)
	if err != nil {
		if serviceErr, ok := err.(*models.ServiceError); ok {
			return c.Status(serviceErr.Code).JSON(serviceErr)
		}
		return c.Status(fiber.StatusInternalServerError).JSON(&models.ServiceError{
			Code:    500,
			Message: err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(models.Success("Contract Created Successfully"))
}

func (h *Handler) GetContract(c *fiber.Ctx) error {
	userId := c.Query("id")
	if userId == "" {
		return c.Status(400).JSON(errors.New("error while parsing the request Body"))
	}
	resp, err := h.ProductTypeService.GetContract(userId)
	if err != nil {
		if serviceErr, ok := err.(*models.ServiceError); ok {
			return c.Status(serviceErr.Code).JSON(serviceErr)
		}
		return c.Status(fiber.StatusInternalServerError).JSON(&models.ServiceError{
			Code:    500,
			Message: err.Error(),
		})
	}
	c.Set("Content-Type", "text/markdown")
	return c.SendString(resp)
}

func (h *Handler) AcceptContract(c *fiber.Ctx) error {
	userId := c.Query("id")
	if userId == "" {
		return c.Status(400).JSON(errors.New("error while parsing the request Body"))
	}
	resp, err := h.ProductTypeService.AcceptContract(userId)
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

func (h *Handler) CheckLicense(c *fiber.Ctx) error {
	id := c.Query("id")
	if id == "" {
		return c.Status(400).JSON(errors.New("licenseId cannot be empty"))
	}
	resp, err := h.ProductTypeService.CheckLicense(id)
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

func (h *Handler) GetOScript(c *fiber.Ctx) error {
	ostype := c.Query("ostype")
	if ostype == "" {
		return c.Status(fiber.StatusBadRequest).JSON(&models.ServiceError{
			Code:    400,
			Message: "Os type cannot be empty",
		})
	}
	fileName := ""
	if ostype == "linux" {
		fileName = "./scripts/linux.sh"
	} else if ostype == "macos" {
		fileName = "./scripts/macos.sh"
	} else {
		return c.Status(fiber.StatusBadRequest).JSON(&models.ServiceError{
			Code:    400,
			Message: "os type can only be windows or linux",
		})
	}
	fileContent, err := os.ReadFile(fileName)
	if err != nil {
		log.Fatal("Error reading file: ", err)
		return c.Status(500).SendString("Error reading file")
	}
	c.Set("Content-Type", "application/x-sh")
	c.Set("Content-Disposition", "attachment; filename=script.sh")
	return c.Send(fileContent)
}
