# API Specification

## Authentication Endpoints

### POST /api/auth/register
Register a new user
- Body: { username, email, password }
- Response: { userId, message }

### POST /api/auth/login
Login user
- Body: { email, password }
- Response: { token }

## File Endpoints

### GET /api/files
Get user's files
- Headers: Authorization: Bearer {token}
- Response: Array of files

### POST /api/files
Upload new file
- Headers: Authorization: Bearer {token}
- Body: FormData with file
- Response: { message, fileId } 