package routes

import (
	"github.com/aliamerj/affisharp/apk/controllers"
	"github.com/aliamerj/affisharp/middleware"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterDealRoutes(router *gin.RouterGroup, db *gorm.DB) {
	dealGroup := router.Group("/deal")
	{
		dealGroup.POST("/", middleware.ClerkAuthMiddleware(), func(ctx *gin.Context) {
			controllers.CreateNewDeal(ctx, db)
		})
		dealGroup.GET("/", func(ctx *gin.Context) {
			controllers.DealsByCompanyUsername(ctx, db)
		})
		dealGroup.GET("/:company/:deal", func(ctx *gin.Context) {
			controllers.DealByCompanyDealName(ctx, db)

		})

	}
}
