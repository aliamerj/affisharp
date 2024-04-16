package controllers

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/aliamerj/affisharp/apk/modules"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/locales/en"
	ut "github.com/go-playground/universal-translator"
	"github.com/go-playground/validator/v10"
	en_translations "github.com/go-playground/validator/v10/translations/en"
	"gorm.io/gorm"
)

func CreateNewCompany(c *gin.Context, db *gorm.DB) {
	validate := validator.New()
	en := en.New()
	uni = ut.New(en, en)
	trans, _ := uni.GetTranslator("en")
	en_translations.RegisterDefaultTranslations(validate, trans)
	userId := c.GetString("userId")
	if userId == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "unauthorize Request"})
		return
	}

	var company modules.Company

	if err := json.NewDecoder(c.Request.Body).Decode(&company); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "invalid Json"})
		return
	}
	company.UserId = userId
	if err := validate.Struct(company); err != nil {
		errs, ok := err.(validator.ValidationErrors)
		if !ok {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request"})
			return
		}

		translatedErrs := errs.Translate(trans)

		for _, errMessage := range translatedErrs {
			c.JSON(http.StatusBadRequest, gin.H{"message": errMessage})

			return
		}

	}

	company.Username = strings.ToLower(company.Username)

	if res := db.Create(&company); res.Error != nil {
		errMessage := modules.GetUserFriendlyErrorMessage(res.Error)
		c.JSON(http.StatusBadRequest, gin.H{"message": errMessage})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Company registered successfully", "body": company})
	return
}

func ValidateUsername(c *gin.Context, db *gorm.DB) {
	validate := validator.New()
	en := en.New()
	uni = ut.New(en, en)
	trans, _ := uni.GetTranslator("en")
	username, exist := c.GetQuery("username")
	en_translations.RegisterDefaultTranslations(validate, trans)
	if username == "" || !exist {
		c.JSON(http.StatusNotFound, gin.H{"message": "404 NOT FOUND"})
		return
	}

	var company modules.Company
	var companyUsername modules.CompanyUsername

	companyUsername.Username = username

	if err := validate.Struct(companyUsername); err != nil {
		errs, ok := err.(validator.ValidationErrors)
		if !ok {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request"})
			return
		}

		translatedErrs := errs.Translate(trans)

		for _, errMessage := range translatedErrs {
			c.JSON(http.StatusBadRequest, gin.H{"message": errMessage})

			return
		}

	}
	username = strings.ToLower(username)
	if res := db.Where("username = ?", username).First(&company); res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			c.JSON(http.StatusOK, gin.H{"message": "Unique"})
			return

		}

		c.JSON(http.StatusBadRequest, gin.H{"message": res.Error.Error()})
		return
	}
	c.JSON(http.StatusBadRequest, gin.H{"message": "Username is already taken"})
	return
}

func CompanyByUserId(c *gin.Context, db *gorm.DB) {
	validate := validator.New()
	en := en.New()
	uni = ut.New(en, en)
	trans, _ := uni.GetTranslator("en")
	user, exist := c.GetQuery("user")
	en_translations.RegisterDefaultTranslations(validate, trans)
	if user == "" || !exist {
		c.JSON(http.StatusNotFound, gin.H{"message": "404 NOT FOUND"})
		return
	}
	var company modules.Company
	if res := db.Where("user_id = ?", user).First(&company); res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"message": "NOT Found"})
			return
		}
		errMessage := modules.GetUserFriendlyErrorMessage(res.Error)
		c.JSON(http.StatusBadRequest, gin.H{"message": errMessage})
		return

	}
	c.JSON(http.StatusOK, gin.H{"message": "Company Found", "body": company})
	return
}
