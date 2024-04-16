package routes

import (
	"github.com/aliamerj/affisharp/apk/controllers"
	"github.com/aliamerj/affisharp/middleware"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterDealRoutes(router *gin.RouterGroup, db *gorm.DB) {
	conpanyGroup := router.Group("/deal")
	{
		conpanyGroup.POST("/", middleware.ClerkAuthMiddleware(), func(ctx *gin.Context) {
			controllers.CreateNewDeal(ctx, db)
		})
		conpanyGroup.GET("/", func(ctx *gin.Context) {
			controllers.DealsByCompanyUsername(ctx, db)
		})

	}
}
