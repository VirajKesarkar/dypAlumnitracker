const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your database connection

// Search Alumni Route
router.get('/search-alumni', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required.' });
  }

  try {
    // Search alumni in the database by name, email, year, or company
    const results = await db.query(
      `SELECT id, name, email, graduation_year, company
       FROM alumni
       WHERE name ILIKE $1 OR email ILIKE $1 OR company ILIKE $1 OR graduation_year::text = $1`,
      [`%${query}%`]
    );

    res.json(results.rows);
  } catch (err) {
    console.error('Error searching alumni:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
