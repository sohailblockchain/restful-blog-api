const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { posts, comments } = require('../data/storage');

// GET all posts (with optional filtering)
router.get('/', (req, res) => {
  const { author, published } = req.query;
  
  let filteredPosts = [...posts];
  
  if (author) {
    filteredPosts = filteredPosts.filter(post => 
      post.author.toLowerCase().includes(author.toLowerCase())
    );
  }
  
  if (published !== undefined) {
    const isPublished = published === 'true';
    filteredPosts = filteredPosts.filter(post => post.published === isPublished);
  }
  
  res.json({
    success: true,
    count: filteredPosts.length,
    data: filteredPosts
  });
});

// GET single post by ID
router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  
  if (!post) {
    return res.status(404).json({
      success: false,
      error: 'Post not found'
    });
  }
  
  res.json({
    success: true,
    data: post
  });
});

// GET all comments for a specific post
router.get('/:id/comments', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  
  if (!post) {
    return res.status(404).json({
      success: false,
      error: 'Post not found'
    });
  }
  
  const postComments = comments.filter(c => c.postId === req.params.id);
  
  res.json({
    success: true,
    count: postComments.length,
    data: postComments
  });
});

// CREATE new post
router.post('/', (req, res) => {
  const { title, content, author, published } = req.body;
  
  // Validation
  if (!title || !content || !author) {
    return res.status(400).json({
      success: false,
      error: 'Title, content, and author are required'
    });
  }
  
  const newPost = {
    id: uuidv4(),
    title,
    content,
    author,
    published: published || false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  posts.push(newPost);
  
  res.status(201).json({
    success: true,
    message: 'Post created successfully',
    data: newPost
  });
});

// UPDATE post by ID
router.put('/:id', (req, res) => {
  const postIndex = posts.findIndex(p => p.id === req.params.id);
  
  if (postIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Post not found'
    });
  }
  
  const { title, content, author, published } = req.body;
  
  // Update only provided fields
  if (title) posts[postIndex].title = title;
  if (content) posts[postIndex].content = content;
  if (author) posts[postIndex].author = author;
  if (published !== undefined) posts[postIndex].published = published;
  
  posts[postIndex].updatedAt = new Date().toISOString();
  
  res.json({
    success: true,
    message: 'Post updated successfully',
    data: posts[postIndex]
  });
});

// PATCH post by ID (partial update)
router.patch('/:id', (req, res) => {
  const postIndex = posts.findIndex(p => p.id === req.params.id);
  
  if (postIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Post not found'
    });
  }
  
  const allowedUpdates = ['title', 'content', 'author', 'published'];
  const updates = Object.keys(req.body);
  
  updates.forEach(update => {
    if (allowedUpdates.includes(update)) {
      posts[postIndex][update] = req.body[update];
    }
  });
  
  posts[postIndex].updatedAt = new Date().toISOString();
  
  res.json({
    success: true,
    message: 'Post updated successfully',
    data: posts[postIndex]
  });
});

// DELETE post by ID
router.delete('/:id', (req, res) => {
  const postIndex = posts.findIndex(p => p.id === req.params.id);
  
  if (postIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Post not found'
    });
  }
  
  const deletedPost = posts.splice(postIndex, 1)[0];
  
  // Also delete all comments for this post
  const commentIndices = [];
  comments.forEach((comment, index) => {
    if (comment.postId === req.params.id) {
      commentIndices.push(index);
    }
  });
  
  // Delete comments in reverse order to maintain correct indices
  commentIndices.reverse().forEach(index => {
    comments.splice(index, 1);
  });
  
  res.json({
    success: true,
    message: 'Post and associated comments deleted successfully',
    data: deletedPost
  });
});

module.exports = router;
