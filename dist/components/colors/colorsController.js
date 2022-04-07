const pool = require("../../configs/dbConnection");

const color_list = async (req, res) => {
    const colors = await pool.query(`
        SELECT
            id,
            name,
            value
        FROM 
            color`);
    // Feedback to client
    res.json(colors.rows);
}

module.exports = {
    color_list
}