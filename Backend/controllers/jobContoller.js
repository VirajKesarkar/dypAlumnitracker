const pool = require('../db'); // Ensure you have the correct path to your database connection

// Handler to post a new job
const postJob = async (req, res) => {
  const { post, vacancies, skills, degree, cgpa, alumni_name, company_name, contact_number } = req.body;

  console.log('Received job data:', req.body); // Log the received data

  try {
    const query = `
      INSERT INTO jobs (post, vacancies, skills, degree, cgpa, alumni_name, company_name, contact_number)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`;

    const values = [post, vacancies, skills, degree, cgpa, alumni_name, company_name, contact_number];

    console.log('Executing query:', query); // Log the query
    console.log('With values:', values); // Log the values

    // Execute the query
    const result = await pool.query(query, values);

    console.log('Query result:', result); // Log the result

    // Respond with the newly created job posting
    res.status(201).json({ message: 'Job posted successfully', job: result.rows[0] });
  } catch (err) {
    console.error('Error posting job:', err);
    res.status(500).json({ message: 'Failed to post job' });
  }
};

// Handler to retrieve all jobs
const getJobs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error retrieving jobs:', err);
    res.status(500).json({ message: 'Failed to retrieve jobs' });
  }
};

module.exports = {
  postJob,
  getJobs
};