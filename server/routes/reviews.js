const express = require('express');
const router = express.Router();

// Get reviews for a book
router.get('/book/:bookId', (req, res) => {
  res.json({ message: `Get reviews for book ${req.params.bookId}` });
});

// Create review
router.post('/', (req, res) => {
  res.json({ message: 'Create review endpoint working' });
});

module.exports = router;