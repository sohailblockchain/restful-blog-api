// In-memory data storage
const { v4: uuidv4 } = require('uuid');

// Sample data
const posts = [
  {
    id: uuidv4(),
    title: 'Getting Started with Node.js',
    content: 'Node.js is a powerful JavaScript runtime built on Chrome\'s V8 engine. It allows you to build scalable server-side applications.',
    author: 'John Doe',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
    published: true
  },
  {
    id: uuidv4(),
    title: 'Understanding RESTful APIs',
    content: 'REST (Representational State Transfer) is an architectural style for designing networked applications. It relies on stateless, client-server communication.',
    author: 'Jane Smith',
    createdAt: new Date('2024-01-20').toISOString(),
    updatedAt: new Date('2024-01-20').toISOString(),
    published: true
  },
  {
    id: uuidv4(),
    title: 'Express.js Best Practices',
    content: 'Express.js is a minimal and flexible Node.js web application framework. Here are some best practices for building robust applications.',
    author: 'Bob Johnson',
    createdAt: new Date('2024-01-25').toISOString(),
    updatedAt: new Date('2024-01-25').toISOString(),
    published: false
  }
];

const comments = [
  {
    id: uuidv4(),
    postId: posts[0].id,
    author: 'Alice Brown',
    content: 'Great introduction! Very helpful for beginners.',
    createdAt: new Date('2024-01-16').toISOString()
  },
  {
    id: uuidv4(),
    postId: posts[0].id,
    author: 'Charlie Wilson',
    content: 'Thanks for sharing. Looking forward to more content!',
    createdAt: new Date('2024-01-17').toISOString()
  },
  {
    id: uuidv4(),
    postId: posts[1].id,
    author: 'Diana Lee',
    content: 'This cleared up a lot of confusion I had about REST APIs.',
    createdAt: new Date('2024-01-21').toISOString()
  }
];

module.exports = {
  posts,
  comments
};
