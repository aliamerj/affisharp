package modules

import "gorm.io/gorm"

type Affiliate struct {
	gorm.Model
	DealID uint   `json:"dealId" gorm:"index:idx_user_deal,unique;not null;constraint:OnDelete:CASCADE;" validate:"required,min=1"`
	UserID string `json:"userId" gorm:"index:idx_user_deal,unique;not null" validate:"required,min=1"`
}
