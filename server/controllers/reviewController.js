const Review = require('../models/Review');
const Book = require('../models/Book');

// @desc    Get reviews for a book
// @route   GET /api/reviews/book/:bookId
// @access  Public
const getBookReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;
    
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    const existingReview = await Review.findOne({ book: bookId, user: req.user._id });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }
    
    const review = await Review.create({
      book: bookId,
      user: req.user._id,
      rating,
      comment,
    });
    
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await review.remove();
    res.json({ message: 'Review removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getBookReviews, createReview, deleteReview };