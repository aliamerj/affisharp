package routes

import (
	"github.com/aliamerj/affisharp/apk/controllers"
	"github.com/aliamerj/affisharp/middleware"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func AffiliateRoutes(router *gin.RouterGroup, db *gorm.DB) {
	affiGroup := router.Group("/affi")
	{
		affiGroup.GET("/create/:company/:deal", middleware.ClerkAuthMiddleware(), func(ctx *gin.Context) {
			controllers.CreateAffiLink(ctx, db)
		})
		affiGroup.GET("/:company/:deal", middleware.ClerkAuthMiddleware(), func(ctx *gin.Context) {
			controllers.GetAffiLink(ctx, db)
		})
	}
}
