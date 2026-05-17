const Book = require('../models/Book');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
  try {
    const { genre, search, page = 1, limit = 100 } = req.query;
    const query = {};

    if (genre) query.genre = genre;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
      ];
    }

    const books = await Book.find(query)
      .sort({ title: 1 })
      .limit(Number(limit))
      .skip((page - 1) * Number(limit));

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a book (admin only - for demo purposes)
// @route   POST /api/books
// @access  Private/Admin
const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Seed initial books (for demo)
const seedBooks = async (req, res) => {
  try {
    const sampleBooks = [
      { title: 'Pride and Prejudice', author: 'Jane Austen', description: 'A classic tale of love and social standing in Georgian England.', genre: 'Romance', publishedYear: 1813 },
      { title: 'To Kill a Mockingbird', author: 'Harper Lee', description: 'A gripping story of racial injustice in the American South.', genre: 'Fiction', publishedYear: 1960 },
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', description: 'The mysterious Jay Gatsby and his obsession with Daisy Buchanan.', genre: 'Fiction', publishedYear: 1925 },
      { title: 'Jane Eyre', author: 'Charlotte Brontë', description: 'An orphaned girl\'s journey to find love and independence.', genre: 'Romance', publishedYear: 1847 },
      { title: 'The Hobbit', author: 'J.R.R. Tolkien', description: 'Bilbo Baggins\' unexpected journey with a company of dwarves.', genre: 'Fantasy', publishedYear: 1937 },
      { title: 'Murder on the Orient Express', author: 'Agatha Christie', description: 'A murder mystery aboard the famous luxury train.', genre: 'Mystery', publishedYear: 1934 },
    ];
    
    await Book.insertMany(sampleBooks);
    res.json({ message: 'Books seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getBooks, getBookById, createBook, seedBooks };