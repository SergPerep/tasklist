const router = require("express").Router();
const pool = require("../db");

// Get colors

router.get("/", async (req, res) => {
    const colors = await pool.query(`
        SELECT
            id,
            name,
            value
        FROM 
            color`);
    // Feedback to client
    res.json(colors.rows);
});

module.exports = router;