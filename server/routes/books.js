const express = require('express');
const router = express.Router();

// Get all books
router.get('/', (req, res) => {
  res.json({ message: 'Get all books endpoint working' });
});

// Get single book
router.get('/:id', (req, res) => {
  res.json({ message: `Get book with id ${req.params.id}` });
});

// Create book
router.post('/', (req, res) => {
  res.json({ message: 'Create book endpoint working' });
});

module.exports = router;