# Quick Start Guide

Follow these steps to get the Blog API up and running in minutes!

## Step 1: Install Dependencies

```bash
npm install
```

This will install:
- express (web framework)
- uuid (for generating unique IDs)
- cors (for cross-origin requests)
- nodemon (for development)

## Step 2: Start the Server

### Production Mode:
```bash
npm start
```

### Development Mode (with auto-reload):
```bash
npm run dev
```

You should see:
```
Blog API server is running on port 3000
Visit http://localhost:3000 for API information
```

## Step 3: Test the API

### Option 1: Use your web browser
Open your browser and visit:
- http://localhost:3000/ (API info)
- http://localhost:3000/api/posts (see all posts)
- http://localhost:3000/api/comments (see all comments)

### Option 2: Use cURL (Terminal/Command Prompt)

**Get all posts:**
```bash
curl http://localhost:3000/api/posts
```

**Create a new post:**
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Post","content":"Hello World!","author":"John","published":true}'
```

**Get post by ID** (replace POST_ID with actual ID from previous response):
```bash
curl http://localhost:3000/api/posts/POST_ID
```

### Option 3: Use Postman
1. Open Postman
2. Import the file: `Blog-API.postman_collection.json`
3. Start testing all endpoints!

## Step 4: Try These Examples

### 1. Create a Post
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learning Node.js",
    "content": "Node.js is awesome for building APIs!",
    "author": "Student",
    "published": true
  }'
```

Copy the `id` from the response for the next steps.

### 2. Add a Comment to Your Post
Replace `YOUR_POST_ID` with the ID from step 1:

```bash
curl -X POST http://localhost:3000/api/comments \
  -H "Content-Type: application/json" \
  -d '{
    "postId": "YOUR_POST_ID",
    "author": "Reader",
    "content": "Great post! Very helpful."
  }'
```

### 3. Get All Comments for Your Post
```bash
curl http://localhost:3000/api/posts/YOUR_POST_ID/comments
```

### 4. Update Your Post
```bash
curl -X PATCH http://localhost:3000/api/posts/YOUR_POST_ID \
  -H "Content-Type: application/json" \
  -d '{"published": false}'
```

### 5. Filter Posts
**Get only published posts:**
```bash
curl http://localhost:3000/api/posts?published=true
```

**Get posts by author:**
```bash
curl http://localhost:3000/api/posts?author=john
```

## Common Issues

### Port 3000 is already in use
If you see an error about port 3000 being in use:
1. Stop any other applications using port 3000
2. Or change the port in the code (server.js, line 5)

### Dependencies not installed
If you see errors about missing modules:
```bash
npm install
```

## What's Next?

- Read the full [README.md](README.md) for complete API documentation
- Import the Postman collection for easier testing
- Modify the code to add new features
- Connect to a real database (MongoDB, PostgreSQL, etc.)

## Sample Data

The API comes pre-loaded with:
- 3 blog posts
- 3 comments

You can modify this data in `data/storage.js`

## API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:id` | Get single post |
| GET | `/api/posts/:id/comments` | Get post comments |
| POST | `/api/posts` | Create new post |
| PUT | `/api/posts/:id` | Update post |
| PATCH | `/api/posts/:id` | Partial update post |
| DELETE | `/api/posts/:id` | Delete post |
| GET | `/api/comments` | Get all comments |
| GET | `/api/comments/:id` | Get single comment |
| POST | `/api/comments` | Create new comment |
| PUT | `/api/comments/:id` | Update comment |
| PATCH | `/api/comments/:id` | Partial update comment |
| DELETE | `/api/comments/:id` | Delete comment |

## Need Help?

Check the [README.md](README.md) file for detailed documentation!

Happy coding! 🚀
