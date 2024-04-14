FROM golang:1.22.2-alpine3.19 AS base

WORKDIR /server

# Install Git and any other necessary packages
RUN apk add --no-cache git

# Copy Go module files and download dependencies
COPY go.mod go.sum ./
RUN go mod download



FROM base as dev

# Copy the source code
COPY . .
# Install Air for live reloading
RUN go install github.com/cosmtrek/air@latest

# Download all dependencies. 
# Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Run air for live reloading
CMD air -c .air.toml

# Production stage
FROM base AS prod

COPY *.go ./

# Add CA Certificates
RUN apk --no-cache add ca-certificates

# Create a user group and user to run the application
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Build the Go app, ensuring the binary is in the correct directory. Adjust 'main.go' path if necessary.

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .


# Optionally, remove source files if not needed. Adjust paths as necessary.
# Note: This will remove your source code, which is typically fine for a Docker image, but ensure this is what you want.
RUN rm -rf *.go

# Remove go.mod and go.sum files
RUN rm go.mod go.sum

# Switch to the non-root user for running the application
USER appuser

# Set the binary as the container's entrypoint. Using CMD to display files with 'ls -a' for debugging can be replaced with the direct execution command.
CMD ls -a && ./main
