const pool = require('../config/db');

// Controller to fetch all alumni
const getAllAlumni = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM alumni');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { getAllAlumni };
