const express = require('express');
const { postJob, getJobs } = require('../controllers/jobController');

const router = express.Router();

// POST route to post a job
router.post('/api/jobs', postJob);

// GET route to fetch all jobs
router.get('/api/jobs', getJobs);

module.exports = router;
