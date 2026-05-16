const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Import routes
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const reviewRoutes = require('./routes/reviews');
const readingListRoutes = require('./routes/readingList');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/reading-list', readingListRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: '🌸 Petals & Pages API is running', status: 'healthy' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✨ Server running on port ${PORT}`);
  console.log(`📚 Petals & Pages Book Review API is ready`);
  console.log(`🌸 http://localhost:${PORT}`);
});