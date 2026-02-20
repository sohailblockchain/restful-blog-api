# RESTful Blog API

A complete RESTful API for a blog application built with Node.js and Express. This API provides endpoints for managing blog posts and comments with full CRUD operations.

## Features

- ✅ Full CRUD operations for Posts
- ✅ Full CRUD operations for Comments
- ✅ RESTful design principles
- ✅ Filtering and query parameters
- ✅ Input validation
- ✅ Error handling
- ✅ CORS enabled
- ✅ In-memory data storage (easy to swap with a real database)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Extract the zip file
2. Navigate to the project directory:
   ```bash
   cd blog-api
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

5. The API will be running at `http://localhost:3000`

## API Endpoints

### Root

#### GET /
Get API information and available endpoints.

**Response:**
```json
{
  "message": "Welcome to the Blog API",
  "version": "1.0.0",
  "endpoints": {
    "posts": "/api/posts",
    "comments": "/api/comments"
  }
}
```

---

### Posts

#### GET /api/posts
Get all posts with optional filtering.

**Query Parameters:**
- `author` - Filter by author name (case-insensitive, partial match)
- `published` - Filter by published status (true/false)

**Example:**
```bash
GET /api/posts?author=john&published=true
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "uuid",
      "title": "Post Title",
      "content": "Post content...",
      "author": "John Doe",
      "published": true,
      "createdAt": "2024-01-15T00:00:00.000Z",
      "updatedAt": "2024-01-15T00:00:00.000Z"
    }
  ]
}
```

#### GET /api/posts/:id
Get a single post by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Post Title",
    "content": "Post content...",
    "author": "John Doe",
    "published": true,
    "createdAt": "2024-01-15T00:00:00.000Z",
    "updatedAt": "2024-01-15T00:00:00.000Z"
  }
}
```

#### GET /api/posts/:id/comments
Get all comments for a specific post.

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "uuid",
      "postId": "post-uuid",
      "author": "Alice Brown",
      "content": "Great post!",
      "createdAt": "2024-01-16T00:00:00.000Z"
    }
  ]
}
```

#### POST /api/posts
Create a new post.

**Request Body:**
```json
{
  "title": "My New Post",
  "content": "This is the content of my post...",
  "author": "John Doe",
  "published": false
}
```

**Required Fields:** `title`, `content`, `author`

**Response:**
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "id": "uuid",
    "title": "My New Post",
    "content": "This is the content of my post...",
    "author": "John Doe",
    "published": false,
    "createdAt": "2024-01-20T00:00:00.000Z",
    "updatedAt": "2024-01-20T00:00:00.000Z"
  }
}
```

#### PUT /api/posts/:id
Update an entire post.

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content...",
  "author": "John Doe",
  "published": true
}
```

#### PATCH /api/posts/:id
Partially update a post (only provided fields).

**Request Body:**
```json
{
  "published": true
}
```

#### DELETE /api/posts/:id
Delete a post and all its associated comments.

**Response:**
```json
{
  "success": true,
  "message": "Post and associated comments deleted successfully",
  "data": {
    "id": "uuid",
    "title": "Deleted Post",
    ...
  }
}
```

---

### Comments

#### GET /api/comments
Get all comments with optional filtering.

**Query Parameters:**
- `postId` - Filter by post ID
- `author` - Filter by author name (case-insensitive, partial match)

**Example:**
```bash
GET /api/comments?postId=post-uuid
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "uuid",
      "postId": "post-uuid",
      "author": "Alice Brown",
      "content": "Great post!",
      "createdAt": "2024-01-16T00:00:00.000Z"
    }
  ]
}
```

#### GET /api/comments/:id
Get a single comment by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "postId": "post-uuid",
    "author": "Alice Brown",
    "content": "Great post!",
    "createdAt": "2024-01-16T00:00:00.000Z"
  }
}
```

#### POST /api/comments
Create a new comment.

**Request Body:**
```json
{
  "postId": "post-uuid",
  "author": "Alice Brown",
  "content": "This is my comment..."
}
```

**Required Fields:** `postId`, `author`, `content`

**Response:**
```json
{
  "success": true,
  "message": "Comment created successfully",
  "data": {
    "id": "uuid",
    "postId": "post-uuid",
    "author": "Alice Brown",
    "content": "This is my comment...",
    "createdAt": "2024-01-16T00:00:00.000Z"
  }
}
```

#### PUT /api/comments/:id
Update an entire comment.

**Request Body:**
```json
{
  "author": "Alice Brown",
  "content": "Updated comment content..."
}
```

**Required Fields:** `author`, `content`

#### PATCH /api/comments/:id
Partially update a comment.

**Request Body:**
```json
{
  "content": "Updated content only..."
}
```

#### DELETE /api/comments/:id
Delete a comment.

**Response:**
```json
{
  "success": true,
  "message": "Comment deleted successfully",
  "data": {
    "id": "uuid",
    ...
  }
}
```

---

## Testing the API

### Using cURL

#### Create a new post:
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "This is the content",
    "author": "Test User",
    "published": true
  }'
```

#### Get all posts:
```bash
curl http://localhost:3000/api/posts
```

#### Create a comment:
```bash
curl -X POST http://localhost:3000/api/comments \
  -H "Content-Type: application/json" \
  -d '{
    "postId": "POST_ID_HERE",
    "author": "Commenter",
    "content": "Great post!"
  }'
```

### Using Postman

1. Import the collection (if provided) or create requests manually
2. Set the base URL to `http://localhost:3000`
3. Test all endpoints with different HTTP methods

### Using a Web Browser

For GET requests, simply visit:
- `http://localhost:3000/`
- `http://localhost:3000/api/posts`
- `http://localhost:3000/api/comments`

---

## Error Handling

The API returns appropriate HTTP status codes:

- `200 OK` - Successful GET, PUT, PATCH
- `201 Created` - Successful POST
- `400 Bad Request` - Invalid input/missing required fields
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

Error response format:
```json
{
  "success": false,
  "error": "Error message here"
}
```

---

## Project Structure

```
blog-api/
├── data/
│   └── storage.js          # In-memory data storage
├── routes/
│   ├── posts.js            # Posts routes
│   └── comments.js         # Comments routes
├── server.js               # Main server file
├── package.json            # Dependencies
└── README.md              # Documentation
```

---

## Future Enhancements

- [ ] Add database integration (MongoDB, PostgreSQL, etc.)
- [ ] Implement authentication and authorization
- [ ] Add user management
- [ ] Implement pagination for large datasets
- [ ] Add search functionality
- [ ] Add rate limiting
- [ ] Add request logging
- [ ] Add data validation with a library like Joi or Express-validator
- [ ] Add unit and integration tests
- [ ] Add API versioning
- [ ] Add Swagger/OpenAPI documentation

---

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **UUID** - Unique ID generation
- **CORS** - Cross-Origin Resource Sharing

---

## License

MIT License - feel free to use this project for learning and development!

---

## Support

If you encounter any issues or have questions, please create an issue in the repository or contact the maintainer.

Happy coding! 🚀
