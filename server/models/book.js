const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a book title'],
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'Please add an author'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  genre: {
    type: String,
    required: [true, 'Please add a genre'],
    enum: ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Fantasy', 'Sci-Fi', 'Biography', 'Thriller', 'Poetry', 'History'],
  },
  publishedYear: {
    type: Number,
    required: [true, 'Please add published year'],
  },
  coverImage: {
    type: String,
    default: '',
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Book', bookSchema);