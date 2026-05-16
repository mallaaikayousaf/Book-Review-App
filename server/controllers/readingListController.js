const ReadingList = require('../models/ReadingList');
const Book = require('../models/Book');

// @desc    Get user's reading list
// @route   GET /api/reading-list
// @access  Private
const getReadingList = async (req, res) => {
  try {
    let readingList = await ReadingList.findOne({ user: req.user._id })
      .populate('books.book');
    
    if (!readingList) {
      readingList = await ReadingList.create({ user: req.user._id, books: [] });
    }
    
    res.json(readingList.books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add book to reading list
// @route   POST /api/reading-list
// @access  Private
const addToReadingList = async (req, res) => {
  try {
    const { bookId, status = 'want-to-read' } = req.body;
    
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    let readingList = await ReadingList.findOne({ user: req.user._id });
    if (!readingList) {
      readingList = await ReadingList.create({ user: req.user._id, books: [] });
    }
    
    const alreadyExists = readingList.books.find(item => item.book.toString() === bookId);
    if (alreadyExists) {
      return res.status(400).json({ message: 'Book already in reading list' });
    }
    
    readingList.books.push({ book: bookId, status });
    await readingList.save();
    
    res.json(readingList.books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove book from reading list
// @route   DELETE /api/reading-list/:bookId
// @access  Private
const removeFromReadingList = async (req, res) => {
  try {
    const readingList = await ReadingList.findOne({ user: req.user._id });
    if (!readingList) {
      return res.status(404).json({ message: 'Reading list not found' });
    }
    
    readingList.books = readingList.books.filter(
      item => item.book.toString() !== req.params.bookId
    );
    await readingList.save();
    
    res.json(readingList.books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update book status
// @route   PUT /api/reading-list/:bookId
// @access  Private
const updateBookStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const readingList = await ReadingList.findOne({ user: req.user._id });
    
    if (!readingList) {
      return res.status(404).json({ message: 'Reading list not found' });
    }
    
    const bookEntry = readingList.books.find(
      item => item.book.toString() === req.params.bookId
    );
    
    if (!bookEntry) {
      return res.status(404).json({ message: 'Book not in reading list' });
    }
    
    bookEntry.status = status;
    await readingList.save();
    
    res.json(readingList.books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getReadingList, addToReadingList, removeFromReadingList, updateBookStatus };