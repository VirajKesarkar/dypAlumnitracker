import pool from '../config/db'; // Import database connection

// Search alumni by query
exports.searchAlumni = async (req, res) => {
  const { query } = req.query;

  // Validate the query parameter
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    // SQL query to search alumni by name, email, or skills
    const result = await pool.query(
      `SELECT * FROM alumni 
       WHERE 
         LOWER(first_name) LIKE LOWER($1) OR 
         LOWER(last_name) LIKE LOWER($1) OR 
         LOWER(email) LIKE LOWER($1) OR 
         LOWER(skills) LIKE LOWER($1)`,
      [`%${query}%`] // Dynamic value for SQL parameter
    );

    // If no results are found
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No alumni found matching the search criteria' });
    }

    // Send results
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error searching alumni:', err.message);
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
};
