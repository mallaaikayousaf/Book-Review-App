const Review = require('../models/Review');
const Book = require('../models/Book');

const recalcAvgRating = async (bookId) => {
  try {
    const result = await Review.aggregate([
      { $match: { book: bookId } },
      { 
        $group: { 
          _id: '$book', 
          avgRating: { $avg: '$rating' }, 
          totalReviews: { $sum: 1 } 
        } 
      }
    ]);
    
    const avgRating = result[0]?.avgRating?.toFixed(1) || 0;
    const totalReviews = result[0]?.totalReviews || 0;
    
    await Book.findByIdAndUpdate(bookId, {
      averageRating: avgRating,
      totalReviews: totalReviews,
    });
    
    return { avgRating, totalReviews };
  } catch (error) {
    console.error('Error recalculating rating:', error);
    return null;
  }
};

module.exports = recalcAvgRating;