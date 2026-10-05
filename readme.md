# Notes API

A RESTful Notes API built with **Node.js, Express.js, MongoDB, and Mongoose**.

This project focuses on building a secure backend with authentication, authorization, database relationships, validation, pagination, indexing, error handling, and automated API testing.

## Features

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- User-level authorization
- Notes CRUD operations
- Folder CRUD operations
- MongoDB relationships using references
- Input validation
- Pagination, filtering, and sorting
- MongoDB indexes and compound indexes
- Centralized error handling
- Rate limiting
- Security headers with Helmet
- Winston + Morgan logging
- Automated API testing with Jest and Supertest

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT**
- **bcrypt**
- **Jest & Supertest**
- **Helmet**
- **Winston & Morgan**

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Login and receive JWT |

### Notes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/notes` | Get user's notes |
| GET | `/api/notes/:id` | Get a specific note |
| POST | `/api/notes` | Create a note |
| PATCH | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

### Folders

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/folders` | Get user's folders |
| GET | `/api/folders/:id` | Get a specific folder |
| POST | `/api/folders` | Create a folder |
| PATCH | `/api/folders/:id` | Update a folder |
| DELETE | `/api/folders/:id` | Delete a folder |

Protected routes use:

```http
Authorization: Bearer <token>
```

## Security

- JWT authentication
- bcrypt password hashing
- Resource ownership checks
- Helmet security headers
- Login rate limiting
- Input validation
- Environment variables for secrets

## Testing

Automated API tests are written using **Jest and Supertest**.

Tests cover authentication, authorization, note retrieval, empty collections, and note creation.

Run tests with:

```bash
npm test
```

## Getting Started

Clone the repository and install dependencies:

```bash
git clone <your-repository-url>
cd notes-api
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

For testing, configure a separate test database:

```env
MONGO_URI_TEST=your_test_database_connection_string
```

Start the server:

```bash
npm start
```

## Author

**Asim Saeed**