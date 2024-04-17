package middleware

import (
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/clerk/clerk-sdk-go/v2/jwt"
	"github.com/gin-gonic/gin"
)

func ClerkAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		clerkAPIKey := os.Getenv("CLERK_SECRET_KEY")
		if clerkAPIKey == "" {
			panic("CLERK_API_KEY must be set")
		}
		apiPem := os.Getenv("PEM_PUBLIC_KEY")
		if apiPem == "" {
			panic("PEM_PUBLIC_KEY must be set")
		}

		jsonWebkey, err := clerk.JSONWebKeyFromPEM(apiPem)

		sessionToken := strings.TrimPrefix(c.GetHeader("Authorization"), "Bearer ")

		claims, err := jwt.Verify(c.Request.Context(), &jwt.VerifyParams{
			Token: sessionToken,
			JWK:   jsonWebkey,
		})
		if err != nil {
			log.Print(err.Error())
			// handle the error
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired session token"})
			return
		}
		c.Set("userId", claims.Subject)
		c.Next()
	}
}

func ClerkCheckAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		clerkAPIKey := os.Getenv("CLERK_SECRET_KEY")
		if clerkAPIKey == "" {
			panic("CLERK_API_KEY must be set")
		}
		apiPem := os.Getenv("PEM_PUBLIC_KEY")
		if apiPem == "" {
			panic("PEM_PUBLIC_KEY must be set")
		}

		jsonWebkey, err := clerk.JSONWebKeyFromPEM(apiPem)

		sessionToken := strings.TrimPrefix(c.GetHeader("Authorization"), "Bearer ")

		claims, err := jwt.Verify(c.Request.Context(), &jwt.VerifyParams{
			Token: sessionToken,
			JWK:   jsonWebkey,
		})
		if err != nil {
			c.Set("userId", "")
			c.Next()
			return
		}
		c.Set("userId", claims.Subject)
		c.Next()
	}
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		clientURL := os.Getenv("CLIENT_URL")
		if clientURL == "" {
			log.Println("Warning: CLIENT_URL is not set")
		}

		log.Println("Setting CORS headers for:", clientURL)
		c.Writer.Header().Set("Access-Control-Allow-Origin", clientURL)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			log.Println("Handling OPTIONS method for:", c.Request.URL.Path)
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
