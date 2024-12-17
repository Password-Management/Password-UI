package server

import (
	"productUI/handlers"

	"github.com/gofiber/fiber/v2"
)

func Routes(app *fiber.App, h *handlers.Handler) {
	customer := app.Group("/customer")
	customer.Post("/", h.AddNewCustomer)
	customer.Get("/", h.GetCustomerInformation)
}
