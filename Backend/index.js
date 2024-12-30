// Import required modules
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Validate environment variables
if (!process.env.DB_USER || !process.env.DB_HOST || !process.env.DB_NAME || !process.env.DB_PASSWORD || !process.env.DB_PORT) {
  console.error('Missing required database configuration in .env');
  process.exit(1);
}

// Create an Express app
const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://your-production-domain.com'], // Add frontend origins
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json()); // Parse JSON data from requests

// Database connection setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
});

// Check database connection
pool.connect((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err.message);
  } else {
    console.log('Connected to the database');
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Alumni Tracker API is running');
});

// Alumni Routes
app.post('/alumni', async (req, res) => {
  const { first_name, last_name, email, graduation_year, clerk_id } = req.body;

  if (!first_name || !last_name || !email || !graduation_year || !clerk_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO alumni (first_name, last_name, email, graduation_year, clerk_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [first_name, last_name, email, graduation_year, clerk_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting alumni:', err.message);
    res.status(500).json({ message: 'Failed to add alumni', error: err.message });
  }
});

// Job Routes
// Route to post a job
app.post('/jobs', async (req, res) => {
  const { post, vacancies, skills, degree, cgpa, alumni_name, company_name, contact_number } = req.body;

  if (!post || !vacancies || !skills || !degree || !cgpa || !alumni_name || !company_name || !contact_number) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO jobs (post, vacancies, skills, degree, cgpa, alumni_name, company_name, contact_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [post, vacancies, skills, degree, cgpa, alumni_name, company_name, contact_number]
    );
    res.status(201).json({ message: 'Job posted successfully', job: result.rows[0] });
  } catch (err) {
    console.error('Error posting job:', err.message);
    res.status(500).json({ message: 'Failed to post job', error: err.message });
  }
});

// Route to retrieve all jobs
app.get('/jobs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error retrieving jobs:', err.message);
    res.status(500).json({ message: 'Failed to retrieve jobs', error: err.message });
  }
});

// Route to delete a job
app.delete('/jobs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM jobs WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Job post not found to delete' });
    }
    res.status(200).json({ message: 'Job post deleted successfully', job: result.rows[0] });
  } catch (err) {
    console.error('Error deleting job post:', err.message);
    res.status(500).json({ message: 'Failed to delete job post', error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
