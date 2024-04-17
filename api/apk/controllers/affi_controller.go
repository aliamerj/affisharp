package controllers

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/aliamerj/affisharp/apk/modules"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/locales/en"
	ut "github.com/go-playground/universal-translator"
	"github.com/go-playground/validator/v10"
	en_translations "github.com/go-playground/validator/v10/translations/en"
	"gorm.io/gorm"
)

func CreateAffiLink(c *gin.Context, db *gorm.DB) {
	validate := validator.New()
	en := en.New()
	uni = ut.New(en, en)
	trans, _ := uni.GetTranslator("en")
	en_translations.RegisterDefaultTranslations(validate, trans)
	userId := c.GetString("userId")
	dealName := c.Param("deal")
	companyName := c.Param("company")
	if userId == "" || dealName == "" || companyName == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "unauthorize Request"})
		return
	}
	var affi modules.Affiliate
	var deal modules.Deal

	if err := db.Where(&modules.Deal{Name: dealName, CompanyID: companyName}).First(&deal).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"message": "404 NOT Found"})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	affi.DealID = deal.ID
	affi.UserID = userId

	if err := validate.Struct(affi); err != nil {
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
	if err := db.Create(&affi).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	affiSharp := fmt.Sprintf("https://affisharp.com/affi/%d", affi.ID)
	c.JSON(http.StatusCreated, gin.H{"message": "Affiliate Link created successfully", "body": affiSharp})
	return
}

func GetAffiLink(c *gin.Context, db *gorm.DB) {
	validate := validator.New()
	en := en.New()
	uni = ut.New(en, en)
	trans, _ := uni.GetTranslator("en")
	en_translations.RegisterDefaultTranslations(validate, trans)
	userId := c.GetString("userId")
	dealName := c.Param("deal")
	companyName := c.Param("company")
	if userId == "" || dealName == "" || companyName == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "unauthorize Request"})
		return
	}
	var affi modules.Affiliate
	var deal modules.Deal

	if err := db.Where(&modules.Deal{Name: dealName, CompanyID: companyName}).First(&deal).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"message": "404 NOT Found"})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	}

	if err := db.Where(&modules.Affiliate{DealID: deal.ID, UserID: userId}).First(&affi).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	affiSharp := fmt.Sprintf("https://affisharp.com/affi/%d", affi.ID)
	c.JSON(http.StatusCreated, gin.H{"message": "Affiliate Link created successfully", "body": affiSharp})
	return
}
