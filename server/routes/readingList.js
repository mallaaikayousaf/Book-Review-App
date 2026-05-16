const express = require('express');
const router = express.Router();
const { getReadingList, addToReadingList, removeFromReadingList, updateBookStatus } = require('../controllers/readingListController');
const { protect } = require('../middleware/authMiddleware');

// Get user's reading list
router.get('/', protect, getReadingList);

// Add to reading list
router.post('/', protect, addToReadingList);

// Remove from reading list
router.delete('/:bookId', protect, removeFromReadingList);

// Update book status
router.put('/:bookId', protect, updateBookStatus);

module.exports = router;