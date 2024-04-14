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

var errorMap = map[string]string{
	// Unique constraint violation on the username field
	"23505_username": "Another company with the same username already exists. Please choose a different username.",

	// Not-null constraint violations for each required field
	"23502_userId":      "User ID is required. Please provide a valid user ID.",
	"23502_name":        "Company name is required. Please provide a name for the company.",
	"23502_username":    "Username is required. Please provide a username for the company.",
	"23502_description": "Description is required. Please provide a description for the company.",

	// Length violations for fields with specific length restrictions
	"22001_username":    "The username provided is too long. Usernames must be between 3 and 30 characters.",
	"22001_description": "The description provided is too long. Please limit the description to 200 characters.",

	// Generic error messages for unexpected or less common errors
	"default": "An unexpected error occurred. Please try again.",
}

// todo
func GetUserFriendlyErrorMessage(err error) string {

	regexPattern := `uni_[a-zA-Z0-9]+_([a-zA-Z0-9]+).*\(SQLSTATE (\d{5})\)`

	r, err := regexp.Compile(regexPattern)
	if err != nil {
		log.Println("Regex compilation error:", err)
		return errorMap["default"]
	}

	match := r.FindStringSubmatch(err.Error())

	if len(match) > 2 {
		// The first element (match[0]) is the entire match
		// The second element (match[1]) is the first capturing group (constraint description)
		// The third element (match[2]) is the second capturing group (error code)
		constraintDescription := match[1]
		errorCode := match[2]
		emg := errorCode + "_" + constraintDescription
		return errorMap[emg]

	} else {
		return errorMap["default"]
	}
}
