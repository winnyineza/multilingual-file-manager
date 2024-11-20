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

# Create backend structure
print_status "Creating backend structure..."
mkdir -p backend/src/{config,controllers,middlewares,models,routes,services,tests/{unit/{controllers,services,models},integration,e2e},utils}
touch backend/src/{app.js,server.js}
touch backend/.env
touch backend/jest.config.js

# Create frontend structure
print_status "Creating frontend structure..."
mkdir -p frontend/{public,src/{components,pages,services,styles,i18n,contexts}}
touch frontend/src/{App.js,index.js,index.css}
touch frontend/.env
touch frontend/public/index.html

# Create basic index.html template
cat > frontend/public/index.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Multilingual File Manager</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
EOL

# Create documentation structure
print_status "Creating documentation structure..."
mkdir -p docs
touch docs/{api-specification.md,database-schema.png,architecture-diagram.png,frontend-structure.md}

# Create Docker structure
print_status "Creating Docker structure..."
mkdir -p docker

# Move docker-compose.yml to docker directory
cat > docker/docker-compose.yml << 'EOL'
version: '3.8'

services:
  db:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: your_password
      MYSQL_DATABASE: file_manager
      MYSQL_TEST_DATABASE: file_manager_test
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

volumes:
  mysql_data:
EOL

touch docker/{Dockerfile.backend,Dockerfile.frontend}

# Create root files
touch {README.md,.gitignore}

# Create .gitignore content
cat > .gitignore << 'EOL'
node_modules/
dist/
coverage/
.env
.DS_Store
*.log
EOL

print_status "Installing backend dependencies..."
cd backend
npm init -y
npm install express cors mysql2 redis jsonwebtoken bcryptjs multer
npm install --save-dev jest nodemon supertest

cd ../frontend
print_status "Installing frontend dependencies..."
npm init -y
npm install react react-dom react-router-dom i18next react-i18next @shadcn/ui
npm install --save-dev @types/react @types/react-dom

cd ..

# Display the new structure
print_status "Project structure created!"

echo -e "\nRoot directory:"
ls -la

echo -e "\nBackend structure:"
echo "backend/src/"
ls -la backend/src/

echo -e "\nFrontend structure:"
echo "frontend/src/"
ls -la frontend/src/

print_status "Next steps:"
echo "1. Review the structure matches README.md"
echo "2. Configure environment variables in .env files"
echo "3. Install additional dependencies as needed"
echo "4. Start implementing the components"