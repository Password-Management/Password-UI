package server

import (
	"fmt"
	"log"
	"productUI/db"
	"productUI/handlers"
	"productUI/services"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func GetDbCheck() {
	done := make(chan struct{})
	go func() {
		fmt.Println("Inside the channel")
		time.Sleep(5 * time.Second)
		db, err := db.NewDbRequest()
		if err != nil {
			log.Fatal("error in creating a DB request")
			return
		}
		_, err = db.InitDB()
		if err != nil {
			log.Println("error in starting the DataBase: ", err)
			return
		}
		close(done)
	}()
}

func Server() {
	app := fiber.New()
	app.Use(recover.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,HEAD,PUT,DELETE",
	}))
	GetDbCheck()
	app.Get("/heath", func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"status":  "200",
			"message": "Demo service is working fine",
		})
	})
	var Log *log.Logger
	service, err := services.NewProductRequest()
	if err != nil {
		log.Println("error while starting the product services: ", err)
		return
	}
	handlers := handlers.NewHandler(Log).ProductTypeHandler(service)
	Routes(app, handlers)
	err = app.Listen(":8001")
	if err != nil {
		log.Println("error while starting the server: ", err)
	}
}
