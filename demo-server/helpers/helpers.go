package helpers

import (
	"bytes"
	"html/template"
	"log"
	"productUI/models"

	"github.com/joho/godotenv"
)

func Getenv() error {
	err := godotenv.Load()
	if err != nil {
		log.Print("error loading .env file" + err.Error())
		return err
	}
	return nil
}

func TemplateParser(data *models.TemaplateBody) (string , error ){
	tmpl, err := template.ParseFiles("scripts/contract.md.tmpl")
	if err != nil {
		 log.Fatalf("Error parsing template: %v", err)
		 return "", err
	}

	var scriptResponse bytes.Buffer
	// Execute the template and write the output
	if err := tmpl.Execute(&scriptResponse, data); err != nil {
		log.Fatalf("Error executing template: %v", err)
		return "", err
	}

	log.Println("Markdown file generated successfully!")
	return scriptResponse.String(), nil
}
