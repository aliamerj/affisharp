package routes

import (
	"github.com/aliamerj/affisharp/apk/controllers"
	"github.com/aliamerj/affisharp/middleware"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterCompanyRoutes(router *gin.RouterGroup, db *gorm.DB) {
	conpanyGroup := router.Group("/company")
	{

		conpanyGroup.GET("/validate", middleware.ClerkAuthMiddleware(), func(ctx *gin.Context) {
			controllers.ValidateUsername(ctx, db)
		})

		conpanyGroup.POST("/", middleware.ClerkAuthMiddleware(), func(ctx *gin.Context) {
			controllers.CreateNewCompany(ctx, db)
		})

		conpanyGroup.GET("/view", func(ctx *gin.Context) {
			controllers.CompanyByUserId(ctx, db)
		})

	}
}
