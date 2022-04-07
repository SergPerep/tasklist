const pool = require("../../configs/dbConnection");
const logger = require("../../utils/logger");
const { MissingCredentialsError } = require("../../utils/customErrors");
const bcrypt = require("bcryptjs");
const validatePassword = require("../../utils/validatePassword");

const user_checkName_post = async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) throw new MissingCredentialsError("username");
        const dbResponse = await pool.query(`SELECT id FROM users WHERE username=$1;`, [username]);
        if (dbResponse.rows[0]) return res.json({ isUsernameExists: true });
        return res.json({ isUsernameExists: false });
    } catch (error) {
        logger.error(error.message);
    }
};

const user_delete = async (req, res) => {
    try {
        const { password } = req.body;
        const userId = req.session?.user?.userId;

        const isPasswordValid = validatePassword(password);
        if (!isPasswordValid) res.status(400).json({ messageToUser: "Wrong password" });
        const getPass = await pool.query("SELECT password FROM users WHERE id=$1", [userId]);
        
        const hash = getPass.rows[0].password;
        if(!hash) return res.status(500);

        const isPasswordVerified = bcrypt.compareSync(password, hash);
        if (!isPasswordVerified) return res.status(400).json({ messageToUser: "Wrong password" });

        await pool.query("DELETE FROM task WHERE user_id=$1", [userId]);
        await pool.query("DELETE FROM folder WHERE user_id=$1", [userId]);
        await pool.query("DELETE FROM users WHERE id=$1", [userId]);

        req.session.destroy(err => { if (err) throw err });
        res.clearCookie('sid');
        res.status(200).json({ isAuthenticated: false });

    } catch (error) {
        logger.error(error.message);
    }
};

module.exports = {
    user_checkName_post,
    user_delete
}