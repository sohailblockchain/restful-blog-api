const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { posts, comments } = require('../data/storage');

// GET all comments
router.get('/', (req, res) => {
  const { postId, author } = req.query;
  
  let filteredComments = [...comments];
  
  if (postId) {
    filteredComments = filteredComments.filter(comment => comment.postId === postId);
  }
  
  if (author) {
    filteredComments = filteredComments.filter(comment => 
      comment.author.toLowerCase().includes(author.toLowerCase())
    );
  }
  
  res.json({
    success: true,
    count: filteredComments.length,
    data: filteredComments
  });
});

// GET single comment by ID
router.get('/:id', (req, res) => {
  const comment = comments.find(c => c.id === req.params.id);
  
  if (!comment) {
    return res.status(404).json({
      success: false,
      error: 'Comment not found'
    });
  }
  
  res.json({
    success: true,
    data: comment
  });
});

// CREATE new comment
router.post('/', (req, res) => {
  const { postId, author, content } = req.body;
  
  // Validation
  if (!postId || !author || !content) {
    return res.status(400).json({
      success: false,
      error: 'Post ID, author, and content are required'
    });
  }
  
  // Check if post exists
  const post = posts.find(p => p.id === postId);
  if (!post) {
    return res.status(404).json({
      success: false,
      error: 'Post not found'
    });
  }
  
  const newComment = {
    id: uuidv4(),
    postId,
    author,
    content,
    createdAt: new Date().toISOString()
  };
  
  comments.push(newComment);
  
  res.status(201).json({
    success: true,
    message: 'Comment created successfully',
    data: newComment
  });
});

// UPDATE comment by ID
router.put('/:id', (req, res) => {
  const commentIndex = comments.findIndex(c => c.id === req.params.id);
  
  if (commentIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Comment not found'
    });
  }
  
  const { author, content } = req.body;
  
  // Validation
  if (!author || !content) {
    return res.status(400).json({
      success: false,
      error: 'Author and content are required'
    });
  }
  
  comments[commentIndex].author = author;
  comments[commentIndex].content = content;
  comments[commentIndex].updatedAt = new Date().toISOString();
  
  res.json({
    success: true,
    message: 'Comment updated successfully',
    data: comments[commentIndex]
  });
});

// PATCH comment by ID (partial update)
router.patch('/:id', (req, res) => {
  const commentIndex = comments.findIndex(c => c.id === req.params.id);
  
  if (commentIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Comment not found'
    });
  }
  
  const { author, content } = req.body;
  
  if (author) comments[commentIndex].author = author;
  if (content) comments[commentIndex].content = content;
  
  comments[commentIndex].updatedAt = new Date().toISOString();
  
  res.json({
    success: true,
    message: 'Comment updated successfully',
    data: comments[commentIndex]
  });
});

// DELETE comment by ID
router.delete('/:id', (req, res) => {
  const commentIndex = comments.findIndex(c => c.id === req.params.id);
  
  if (commentIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Comment not found'
    });
  }
  
  const deletedComment = comments.splice(commentIndex, 1)[0];
  
  res.json({
    success: true,
    message: 'Comment deleted successfully',
    data: deletedComment
  });
});

module.exports = router;
