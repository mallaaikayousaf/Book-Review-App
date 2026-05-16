const express = require('express');
const router = express.Router();

// Get user's reading list
router.get('/', (req, res) => {
  res.json({ message: 'Get reading list endpoint working' });
});

// Add to reading list
router.post('/', (req, res) => {
  res.json({ message: 'Add to reading list endpoint working' });
});

// Remove from reading list
router.delete('/:id', (req, res) => {
  res.json({ message: `Remove ${req.params.id} from reading list` });
});

module.exports = router;