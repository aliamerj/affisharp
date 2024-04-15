package modules

import (
	"gorm.io/gorm"
	"log"
	"regexp"
)

type Company struct {
	gorm.Model
	UserId      string `json:"userId" gorm:"not null" validate:"required,min=1"`
	Name        string `json:"name" gorm:"not null" validate:"required,min=1"`
	Username    string `json:"username" gorm:"unique;not null" validate:"required,min=3,max=30"`
	Logo        string `json:"logo" validate:"omitempty,url"`
	Description string `json:"description" validate:"required,min=10,max=200"`
}

type CompanyUsername struct {
	Username string `json:"username" gorm:"unique;not null" validate:"required,min=3,max=30"`
}

var errorMap = map[string]string{
	"23505_username":    "Another company with the same username already exists. Please choose a different username.",
	"23502_userId":      "User ID is required. Please provide a valid user ID.",
	"23502_name":        "Company name is required. Please provide a name for the company.",
	"23502_username":    "Username is required. Please provide a username for the company.",
	"23502_description": "Description is required. Please provide a description for the company.",
	"22001_username":    "The username provided is too long. Usernames must be between 3 and 30 characters.",
	"22001_description": "The description provided is too long. Please limit the description to 200 characters.",
	"default":           "An unexpected error occurred. Please try again.",
}

// GetUserFriendlyErrorMessage translates database error messages to user-friendly text.
func GetUserFriendlyErrorMessage(err error) string {
	if err == nil {
		return errorMap["default"]
	}

	regexPattern := `uni_[a-zA-Z0-9]+_([a-zA-Z0-9]+).*\(SQLSTATE (\d{5})\)`

	r, compileErr := regexp.Compile(regexPattern)
	if compileErr != nil {
		log.Println("Regex compilation error:", compileErr)
		return errorMap["default"]
	}

	match := r.FindStringSubmatch(err.Error())
	if len(match) > 2 {
		constraintDescription := match[1]
		errorCode := match[2]
		emg := errorCode + "_" + constraintDescription
		if message, exists := errorMap[emg]; exists {
			return message
		}
	}

	return errorMap["default"]
}
