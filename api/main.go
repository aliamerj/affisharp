package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/aliamerj/affisharp/apk/modules"
	"github.com/aliamerj/affisharp/apk/routes"
	"github.com/aliamerj/affisharp/internal/database"
	"github.com/aliamerj/affisharp/internal/router"
	"github.com/aliamerj/affisharp/middleware"
	"github.com/gin-gonic/gin"
)

func main() {

	gin.SetMode(gin.ReleaseMode)
	db, err := database.Initialization()
	httpPort := os.Getenv("API_PORT")
	if httpPort == "" {
		httpPort = "8080"
	}

	// Automatically migrate multiple schemas
	err = db.AutoMigrate(&modules.Company{})
	if err != nil {
		log.Fatalf("Could not migrate database: %v", err)
	}

	// Initialize router
	router := router.NewRouter()
	router.Use(middleware.CORSMiddleware())
	api := router.Group("/api")
	{
		routes.RegisterCompanyRoutes(api, db)

	}

	// Create server with timeout
	srv := &http.Server{
		Addr:              ":" + httpPort,
		Handler:           router,
		ReadHeaderTimeout: 5 * time.Second,
	}

	if err := srv.ListenAndServe(); err != nil {
		log.Printf("Failed to start server: %v", err)
	}
}
