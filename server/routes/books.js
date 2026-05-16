const express = require('express');
const router = express.Router();
const { getBooks, getBookById, createBook } = require('../controllers/bookController');

// Get all books
router.get('/', getBooks);

// Get single book
router.get('/:id', getBookById);

// Create book
router.post('/', createBook);

module.exports = router;