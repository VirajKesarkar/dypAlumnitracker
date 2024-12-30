const express = require('express');
const { getAllAlumni } = require('../controllers/alumniController');

const router = express.Router();

// GET all alumni
router.get('/', getAllAlumni);

module.exports = router;
