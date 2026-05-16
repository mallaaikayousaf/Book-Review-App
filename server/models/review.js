const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: [true, 'Please add a review comment'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent user from reviewing same book twice
reviewSchema.index({ book: 1, user: 1 }, { unique: true });

// Update book average rating when review is saved
reviewSchema.statics.updateBookRating = async function(bookId) {
  const result = await this.aggregate([
    { $match: { book: bookId } },
    { $group: { _id: '$book', avgRating: { $avg: '$rating' }, totalReviews: { $sum: 1 } } }
  ]);
  
  await mongoose.model('Book').findByIdAndUpdate(bookId, {
    averageRating: result[0]?.avgRating.toFixed(1) || 0,
    totalReviews: result[0]?.totalReviews || 0,
  });
};

reviewSchema.post('save', async function() {
  await this.constructor.updateBookRating(this.book);
});

reviewSchema.post('remove', async function() {
  await this.constructor.updateBookRating(this.book);
});

module.exports = mongoose.model('Review', reviewSchema);