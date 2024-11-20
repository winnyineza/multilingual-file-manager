#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    echo -e "${GREEN}[*] $1${NC}"
}

print_error() {
    echo -e "${RED}[!] $1${NC}"
}

# Create root project directory
print_status "Creating project structure..."

# Backend structure
mkdir -p backend/src/{config,controllers,middlewares,models,routes,services,tests,utils}
touch backend/src/app.js
touch backend/src/server.js
touch backend/.env
touch backend/jest.config.js

# Frontend structure
mkdir -p frontend/{public,src}/{components,pages,services,styles,i18n}
touch frontend/src/App.js
touch frontend/src/index.js
touch frontend/.env

# Documentation
mkdir -p docs
touch docs/{api-specification.md,database-schema.png,architecture-diagram.png,frontend-structure.md}

# Docker setup
mkdir -p docker
touch docker/{Dockerfile.backend,Dockerfile.frontend,docker-compose.yml}

# Root files
touch {README.md,.gitignore}

print_status "Installing backend dependencies..."
cd backend
npm init -y
npm install express cors mysql2 redis jsonwebtoken bcryptjs multer
npm install --save-dev jest nodemon supertest

print_status "Installing frontend dependencies..."
cd ../frontend
npm init -y
npm install @shadcn/ui axios i18next react react-dom react-router-dom react-scripts react-dropzone @radix-ui/react-toast clsx tailwind-merge
npm install --save-dev tailwindcss postcss autoprefixer

print_status "Initializing git repository..."
cd ..
git init
git add .
git commit -m "Initial project setup"

print_status "Project setup complete! 🎉" 