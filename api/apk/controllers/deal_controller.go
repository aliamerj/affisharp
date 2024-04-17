package controllers

import (
	"encoding/json"
	"errors"
	"fmt"
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

func CreateNewDeal(c *gin.Context, db *gorm.DB) {
	validate := validator.New()
	en := en.New()
	uni = ut.New(en, en)
	trans, _ := uni.GetTranslator("en")
	en_translations.RegisterDefaultTranslations(validate, trans)
	userId := c.GetString("userId")
	fmt.Printf("this is userId: %s", userId)
	if userId == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "unauthorize Request"})
		return
	}

	var deal modules.Deal
	var company modules.Company

	if err := json.NewDecoder(c.Request.Body).Decode(&deal); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "invalid Json"})
		return
	}
	if res := db.First(&company, "user_id = ?", userId); res.Error != nil {
		if errors.Is(res.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"message": "You do not have a username, please create one first"})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{"message": res.Error.Error()})
		return
	}

	deal.CompanyID = company.Username

	if err := validate.Struct(deal); err != nil {
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

	deal.Name = strings.ToLower(deal.Name)

	if res := db.Create(&deal); res.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": res.Error.Error(), "body": deal})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Company registered successfully", "body": company})
	return
}

func DealsByCompanyUsername(c *gin.Context, db *gorm.DB) {
	validate := validator.New()
	en := en.New()
	uni = ut.New(en, en)
	trans, _ := uni.GetTranslator("en")
	companyUsername, exist := c.GetQuery("company")
	en_translations.RegisterDefaultTranslations(validate, trans)
	if companyUsername == "" || !exist {
		c.JSON(http.StatusNotFound, gin.H{"message": "404 NOT FOUND"})
		return
	}
	var deals []modules.Deal

	if res := db.Where("company_id = ?", companyUsername).Find(&deals); res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"message": "NOT Found"})
			return
		}

		c.JSON(http.StatusBadRequest, gin.H{"message": res.Error.Error()})
		return

	}
	c.JSON(http.StatusOK, gin.H{"message": "Company Found", "body": deals})
	return
}

type AffiliateRes struct {
	Link  string
	Error error
}

func DealByCompanyDealName(c *gin.Context, db *gorm.DB) {
	validate := validator.New()
	en := en.New()
	uni = ut.New(en, en)
	trans, _ := uni.GetTranslator("en")
	company := c.Param("company")
	dealName := c.Param("deal")
	userId := c.GetString("userId")
	fmt.Printf("userId %s", userId)

	en_translations.RegisterDefaultTranslations(validate, trans)
	if company == "" || dealName == "" {
		c.JSON(http.StatusNotFound, gin.H{"message": "404 NOT FOUND"})
		return
	}
	affiChan := make(chan *AffiliateRes)
	if userId != "" {
		go getAffiLink(userId, dealName, company, db, affiChan)

	}

	var deal modules.Deal
	if err := db.Where(&modules.Deal{CompanyID: company, Name: dealName}).First(&deal).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"message": "NOT Found"})
			return
		}

		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	result := <-affiChan
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusOK, gin.H{"message": "Company Found", "body": deal, "affilink": nil})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{"message": result.Error.Error()})
		return

	}

	c.JSON(http.StatusOK, gin.H{"message": "Company Found", "body": deal, "affilink": result.Link})
	return

}

func getAffiLink(userId string, dealName string, companyName string, db *gorm.DB, affiChan chan *AffiliateRes) {
	validate := validator.New()
	en := en.New()
	uni = ut.New(en, en)
	trans, _ := uni.GetTranslator("en")
	en_translations.RegisterDefaultTranslations(validate, trans)

	var affi modules.Affiliate
	var deal modules.Deal

	if err := db.Where(&modules.Deal{Name: dealName, CompanyID: companyName}).First(&deal).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			affiChan <- &AffiliateRes{Link: "", Error: err}
		}
		affiChan <- &AffiliateRes{Link: "", Error: err}
	}

	if err := db.Where(&modules.Affiliate{DealID: deal.ID, UserID: userId}).First(&affi).Error; err != nil {
		affiChan <- &AffiliateRes{Link: "", Error: err}
	}
	affiSharp := fmt.Sprintf("https://affisharp.com/affi/%d", affi.ID)
	affiChan <- &AffiliateRes{Link: affiSharp, Error: nil}
}
