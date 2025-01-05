package server

import (
	"productUI/handlers"

	"github.com/gofiber/fiber/v2"
)

func Routes(app *fiber.App, h *handlers.Handler) {
	customer := app.Group("/customer")
	customer.Post("/", h.AddNewCustomer)
	customer.Get("/", h.GetCustomerInformation)
	app.Put("/contract", h.CreateContract)
	app.Get("/contract", h.GetContract)
	app.Put("/accept", h.AcceptContract)
	app.Get("/check", h.CheckLicense)
	app.Get("/script", h.GetOScript)
}
