package modules

import "gorm.io/gorm"

type Deal struct {
	gorm.Model
	Name      string `json:"name" gorm:"not null;uniqueIndex:idx_name_company_id"`
	Logo      string `json:"logo" validate:"omitempty,url"`
	Link      string `json:"link" gorm:"not null" validate:"url,required,min=1"`
	CompanyID string `gorm:"foreignKey;column:company_id;not null;references:Username;constraint:OnDelete:CASCADE;"`
}
