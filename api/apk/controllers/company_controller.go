package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/aliamerj/affisharp/apk/modules"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

func CreateNewCompany(c *gin.Context, db *gorm.DB) {
	validate := validator.New()
	userId := c.GetString("userId")
	if userId == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "unauthorize Request"})
	}

	var company modules.Company
	company.UserId = userId
	if err := json.NewDecoder(c.Request.Body).Decode(&company); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "invalid Json"})
		return
	}

	if err := validate.Struct(company); err != nil {
		if _, ok := err.(*validator.InvalidValidationError); ok {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "server error"})
			return
		}
		var validationErrors []string
		for _, err := range err.(validator.ValidationErrors) {
			validationErrors = append(validationErrors, fmt.Sprintf("%s is invalid: %s", err.Field(), err.Tag()))
		}
		c.JSON(http.StatusBadRequest, gin.H{"message": validationErrors})
		return
	}
	company.Username = strings.ToLower(company.Username)

	if res := db.Create(&company); res.Error != nil {
		//TODO : MAKE THE ERROR MESSAGE FRIENDLY
		//	errMessage := modules.GetUserFriendlyErrorMessage(res.Error)

		c.JSON(http.StatusBadRequest, gin.H{"message": res.Error.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Company registered successfully", "body": company})
	return
}
