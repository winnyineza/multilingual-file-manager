# API Specification

## Authentication
### POST /api/users/register
Register a new user
- Body: `{ username, email, password }`
- Response: `{ message, userId }`

### POST /api/users/login
Login user
- Body: `{ email, password }`
- Response: `{ token, user }`

## Files
### POST /api/files
Create new file
- Headers: `Authorization: Bearer <token>`
- Body: `{ name, path, user_id }`
- Response: `{ message, id }`

### GET /api/files/:id
Get file by ID
- Headers: `Authorization: Bearer <token>`
- Response: `{ id, name, path, user_id }`

### PUT /api/files/:id
Update file
- Headers: `Authorization: Bearer <token>`
- Body: `{ name, path }`
- Response: `{ message }`

### DELETE /api/files/:id
Delete file
- Headers: `Authorization: Bearer <token>`
- Response: `{ message }` 