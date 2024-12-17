package handlers

import (
	"log"
	"productUI/services"
)

type Handler struct {
	Logger             *log.Logger
	ProductTypeService services.Product
}

func NewHandler(logger *log.Logger) *Handler {
	return &Handler{Logger: logger}
}

func (h *Handler) ProductTypeHandler(pt services.Product) *Handler {
	h.ProductTypeService = pt
	return h
}
