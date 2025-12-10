# Student Management Module

## Overview

This module implements complete CRUD operations for student management in the school administration system. It includes input validation, pagination, and proper error handling.

## Features

- **Full CRUD Operations**: Create, Read, Update, and Delete students
- **Input Validation**: Zod schema validation for all endpoints
- **Pagination**: Configurable page size with total count
- **Partial Search**: Case-insensitive name search with wildcard matching
- **Status Management**: Enable/disable student accounts

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/students` | List all students (paginated) |
| POST | `/api/v1/students` | Create a new student |
| GET | `/api/v1/students/:id` | Get student details |
| PUT | `/api/v1/students/:id` | Update student |
| POST | `/api/v1/students/:id/status` | Change student status |

## Query Parameters (GET /students)

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 10 | Items per page |
| name | string | - | Filter by name (partial match) |
| className | string | - | Filter by class |
| section | string | - | Filter by section |
| roll | number | - | Filter by roll number |

## Request/Response Examples

### List Students (Paginated)

**Request:**
```
GET /api/v1/students?page=1&limit=5
```

**Response:**
```json
{
    "data": [
        {
            "id": 2,
            "name": "John Doe",
            "email": "john.doe@test.com",
            "lastLogin": null,
            "systemAccess": false
        }
    ],
    "pagination": {
        "page": 1,
        "limit": 5,
        "total": 10,
        "totalPages": 2
    }
}
```

### Search by Name

**Request:**
```
GET /api/v1/students?name=john
```

Returns all students with "john" anywhere in their name (case-insensitive).

### Create Student

**Request:**
```
POST /api/v1/students
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john.doe@test.com",
    "phone": "1234567890",
    "gender": "Male",
    "dob": "2010-05-15",
    "class": "10",
    "section": "A",
    "roll": 1,
    "admissionDate": "2024-01-15",
    "fatherName": "Robert Doe",
    "fatherPhone": "9876543210",
    "motherName": "Jane Doe",
    "motherPhone": "9876543211",
    "currentAddress": "123 Main St",
    "permanentAddress": "123 Main St"
}
```

**Response:**
```json
{
    "message": "Student added and verification email sent successfully."
}
```

### Get Student Detail

**Request:**
```
GET /api/v1/students/2
```

**Response:**
```json
{
    "id": 2,
    "name": "John Doe",
    "email": "john.doe@test.com",
    "systemAccess": false,
    "phone": "1234567890",
    "gender": "Male",
    "dob": "2010-05-15",
    "class": "10",
    "section": "A",
    "roll": 1,
    "fatherName": "Robert Doe",
    "fatherPhone": "9876543210",
    "motherName": "Jane Doe",
    "motherPhone": "9876543211",
    "guardianName": null,
    "guardianPhone": null,
    "relationOfGuardian": null,
    "currentAddress": "123 Main St",
    "permanentAddress": "123 Main St",
    "admissionDate": "2024-01-15",
    "reporterName": "John Doe"
}
```

### Update Student

**Request:**
```
PUT /api/v1/students/2
Content-Type: application/json

{
    "name": "John Smith",
    "email": "john.smith@test.com",
    "phone": "1234567890"
}
```

**Response:**
```json
{
    "message": "Student updated successfully"
}
```

### Change Student Status

**Request:**
```
POST /api/v1/students/2/status
Content-Type: application/json

{
    "status": true
}
```

**Response:**
```json
{
    "message": "Student status changed successfully"
}
```

## Validation

All inputs are validated using Zod schemas. Validation errors return:

```json
{
    "error": "Validation error",
    "detail": [
        {
            "path": "body.email",
            "message": "Invalid email format"
        }
    ]
}
```

### Validation Rules

| Field | Rules |
|-------|-------|
| name | Required, non-empty string |
| email | Required, valid email format |
| gender | Optional, enum: Male, Female, Other |
| roll | Optional, positive integer |
| id (param) | Required, numeric string |
| status | Required, boolean |

## Files Modified

| File | Description |
|------|-------------|
| `students-controller.js` | Request handlers for all endpoints |
| `students-service.js` | Business logic layer |
| `students-repository.js` | Database queries with pagination |
| `students-schema.js` | Zod validation schemas |
| `sudents-router.js` | Route definitions with validation middleware |

## Authentication

All endpoints require:
- Valid JWT access token (cookie: `accessToken`)
- CSRF token (header: `x-csrf-token`)

## Author

Fernando Rey - Backend Developer Skill Test
