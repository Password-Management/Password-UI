package main

import (
	"fmt"
	"productUI/server"
)

func main() {
	fmt.Println("When the product is requested the request comes here.")
	server.Server()
}
