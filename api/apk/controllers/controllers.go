package controllers

import (
	ut "github.com/go-playground/universal-translator"
	"github.com/go-playground/validator/v10"
)

var (
	uni      *ut.UniversalTranslator
	validate *validator.Validate
)
