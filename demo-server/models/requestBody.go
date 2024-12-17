package models

type ProductDetailRequestBody struct {
	Name      string `json:"name"`
	Email     string `json:"email"`
	Plan      string `json:"plan"`
	Algorithm string `json:"algorithm"`
	Platform  string `json:"platform"`
}
