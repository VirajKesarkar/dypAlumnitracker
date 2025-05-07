// Import required modules
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Load environment variables
dotenv.config();

if (!process.env.DB_USER || !process.env.DB_HOST || !process.env.DB_NAME || !process.env.DB_PASSWORD || !process.env.DB_PORT || !process.env.JWT_SECRET) {
  console.error('❌ Missing required configuration in .env');
  process.exit(1);
}

// Create an Express app
const app = express();

// ✅ CORS Configuration
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174','http://localhost:5175'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // ✅ Allows cookies/auth headers
}));

// Middleware
app.use(express.json());

// ✅ Preflight Request Handling (For CORS)
app.options('*', cors());

// ✅ Database connection setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
});

pool.connect()
  .then(() => console.log(' Connected to the database'))
  .catch((err) => console.error('Database connection failed:', err.message));

//  Default route
app.get('/', (req, res) => {
  res.send(' Alumni Tracker API is running');
});

// Admin Authentication
const admin = {
  email: "virajkesarkar3273@gmail.com",
  password: bcrypt.hashSync("1234567890", 10), 
};

//  Middleware to verify admin authentication
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(403).json({ message: " Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

// Admin Login Route
app.post('/api/admin/', async (req, res) => {
  const { email, password } = req.body;

  if (email !== admin.email) {
    return res.status(401).json({ message: " Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(401).json({ message: " Invalid email or password" });
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

//  Protected Admin Dashboard Route
app.get('/api/admin/dashboard', authMiddleware, (req, res) => {
  res.json({ message: "🎉 Welcome to the Admin Dashboard!" });
});

//  Alumni Routes
app.post('/alumni', async (req, res, next) => {
  try {
    const {
      first_name, last_name, email, phoneno, graduation_year,
      course, current_company, post, skills, linkedin_profile
    } = req.body;

    if (!first_name || !last_name || !email || !phoneno || !graduation_year) {
      return res.status(400).json({ message: ' All required fields must be provided' });
    }

    const result = await pool.query(
      `INSERT INTO alumni 
        (first_name, last_name, email, phoneno, graduation_year, course, current_company, post, skills, linkedin_profile)
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING *`,
      [first_name, last_name, email, phoneno, graduation_year, course, current_company, post, skills, linkedin_profile]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// ✅ Search Alumni
app.get('/api/search-alumni', async (req, res, next) => {
  try {
    const { query } = req.query;
    const result = await pool.query(
      "SELECT * FROM alumni WHERE first_name ILIKE $1 OR last_name ILIKE $1 OR email ILIKE $1",
      [`%${query}%`]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: ' No alumni found' });
    }
    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
});

// ✅ Fetch Alumni Profile by Email
app.get('/profile/:email', async (req, res, next) => {
  try {
    const { email } = req.params;
    const result = await pool.query(
      'SELECT * FROM alumni WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: ' Profile not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// ✅ Job Routes
app.post('/api/jobs', async (req, res, next) => {
  try {
    const { post, vacancies, skills, degree, cgpa, alumni_name, company_name, contact_number } = req.body;

    if (!post || !vacancies || !skills || !degree || !cgpa || !alumni_name || !company_name || !contact_number) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const result = await pool.query(
      `INSERT INTO jobs 
        (post, vacancies, skills, degree, cgpa, alumni_name, company_name, contact_number) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [post, vacancies, skills, degree, cgpa, alumni_name, company_name, contact_number]
    );
    res.status(201).json({ message: ' Job posted successfully', job: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

// ✅ Protected Job Delete Route (Only Admins)
app.delete('/jobs/:id', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM jobs WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: ' Job post not found to delete' });
    }
    res.status(200).json({ message: '✅ Job post deleted successfully', job: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

// ✅ Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err.message);
  res.status(500).json({ message: '❌ Internal server error', error: err.message });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
