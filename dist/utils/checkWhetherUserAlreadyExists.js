const pool = require("../configs/dbConnection");

module.exports = async (username) => {
    try {
        const dbData = await pool.query("SELECT id FROM users WHERE username=$1", [username]);
        const isUserAlreadyExists = dbData.rows.length !== 0;
        return isUserAlreadyExists;
    } catch (error) {
        console.error(error.message);
    }
}