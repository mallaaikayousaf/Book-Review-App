const express = require('express');
const router = express.Router();
const { getBookReviews, createReview, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// Get reviews for a book
router.get('/book/:bookId', getBookReviews);

// Create review
router.post('/', protect, createReview);

// Delete review
router.delete('/:id', protect, deleteReview);

module.exports = router;