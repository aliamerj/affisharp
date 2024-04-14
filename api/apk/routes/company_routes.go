package routes

import (
	"net/http"

	"github.com/aliamerj/affisharp/apk/controllers"
	"github.com/aliamerj/affisharp/middleware"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterCompanyRoutes(router *gin.RouterGroup, db *gorm.DB) {
	conpanyGroup := router.Group("/company")
	{
		conpanyGroup.GET("/", middleware.ClerkAuthMiddleware(), func(ctx *gin.Context) {
			ctx.JSON(http.StatusCreated, gin.H{"message": "Company registered successfully"})

		})

		conpanyGroup.POST("/", middleware.ClerkAuthMiddleware(), func(ctx *gin.Context) {
			controllers.CreateNewCompany(ctx, db)
		})

	}
}
