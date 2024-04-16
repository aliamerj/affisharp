package modules

import (
	"log"
	"regexp"
)

type Company struct {
	UserId   string `json:"userId" gorm:"unique;not null" validate:"required,min=1"`
	Username string `json:"username" gorm:"primaryKey;unique;not null" validate:"required,min=3,max=30"`
	/* 	Deals    []Deal `gorm:"references:Username"` */
}

type CompanyUsername struct {
	Username string `json:"username" gorm:"unique;not null" validate:"required,min=3,max=30"`
}

var errorMap = map[string]string{
	"23505_username": "Another company with the same username already exists. Please choose a different username.",
	"23502_userId":   "User ID is required. Please provide a valid user ID.",
	"23502_username": "Username is required. Please provide a username for the company.",
	"22001_username": "The username provided is too long. Usernames must be between 3 and 30 characters.",
	"default":        "An unexpected error occurred. Please try again.",
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
