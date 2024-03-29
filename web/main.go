package main

import (
	"net/http"
	"github.com/julienschmidt/httprouter"
)

func RegisterHandler() *httprouter.Router {
	router := httprouter.New()

	router.GET("/", homeHandler)
	router.POST("/", homeHandler)

	router.GET("/login", loginHandler)
	router.POST("/login", loginHandler)

	router.GET("/userHome", userHomeHandler)
	router.POST("/userHome", userHomeHandler)

	router.POST("/api", apiHandler)
	router.POST("/upload/:vid-id", proxyHandler)

	router.ServeFiles("/statics/*filepath", http.Dir("./bin/template/"))

	return router
} 

func main() {

	r := RegisterHandler()
	http.ListenAndServe(":8080", r)

}

//cross origin resource sharing