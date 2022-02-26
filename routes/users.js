const router = require("express").Router();
const logger = require("../utils/logger");
const { MissingCredentialsError } = require("../utils/customErrors");
const pool = require("../db");


router.post("/", async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) throw new MissingCredentialsError("username");
        const dbResponse = await pool.query(`SELECT id FROM users WHERE username=$1;`, [username]);
        if (dbResponse.rows[0]) return res.json({ isUsernameExists: true });
        return res.json({ isUsernameExists: false });
    } catch (error) {
        logger.error(error.message);
    }
})




module.exports = router;