const express = require('express');
const cors = require('cors');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Blog API',
    version: '1.0.0',
    endpoints: {
      posts: '/api/posts',
      comments: '/api/comments'
    }
  });
});

app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Blog API server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} for API information`);
});
