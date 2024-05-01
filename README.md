# Affisharp

Affisharp is an advanced affiliate management system designed to streamline the creation, management, and tracking of affiliate marketing programs. Leveraging modern technologies in both the frontend and backend, Affisharp provides a robust platform for users to manage affiliate deals effectively.

## Technologies Used

**Backend:**
- **Golang**: Strongly typed language that produces compiled machine code binaries, enhancing performance.
- **Gin**: High-performance HTTP web framework that provides a robust router and middleware framework.
- **Gorm**: Developer-friendly ORM for Golang, supporting a wide range of relational database operations.
- **PostgreSQL**: Powerful, open source object-relational database system.

**Frontend:**
- **Next.js 14**: React framework that enables functionality such as server-side rendering and generating static websites.
- **Clerk**: Comprehensive solution for user authentication, ensuring secure and flexible user management.

## Features

### Dashboard
- **User Management**: Users can create and manage their profiles, enhancing personalization and security.
- **Deal Management**: Facilitates creating, editing, and deleting affiliate deals. Each deal includes essential details like name, landing page URL, and an optional logo.

### Affiliate Subscription Page
- A dedicated page for potential affiliates to sign up for deals. Successful sign-ups trigger the generation of a unique affiliate link for promotions.

### Real-time Tracking (Under Development)
- A tracking API is being developed to monitor and record actions and conversions from affiliate links in real-time.

### Security
- Comprehensive security practices are implemented to protect user data and system integrity.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Install [Golang](https://golang.org/dl/)
- Install [PostgreSQL](https://www.postgresql.org/download/)
- Install [Node.js](https://nodejs.org/en/download/) (which includes npm/yarn)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aliamerj/affisharp.git
   cd affisharp
2. **Set up the database:**
   ```bash
   # Create a PostgreSQL database and note the credentials
   # Populate the .env file with your database credentials
4. **Run the docker**
