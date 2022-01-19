const router = require("express").Router();
const bcrypt = require("bcryptjs");
const pool = require("../db");

// Utils
const genHash = require("../utils/genHash");
const checkWhetherUserAlreadyExists = require("../utils/checkWhetherUserAlreadyExists");
const validateUsername = require("../utils/validateUsername");
const validatePassword = require("../utils/validatePassword");

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (username.length === 0 || password.length === 0) return res.status(400).json("Missing credentials");

        const isUserAlreadyExists = await checkWhetherUserAlreadyExists(username);
        if (isUserAlreadyExists) return res.status(400).json("User already exists. Try login")

        const hash = genHash(password);
        const dbData = await pool.query(`INSERT INTO users (username, password) VALUES ($1, $2)`, [username, hash]);
        res.status(201).json("You have succesfully signed up");
    } catch (error) {
        console.error(error.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (username.length === 0 || password.length === 0) return res.status(400).json("Missing credentials");

        const isUsernameValid = validateUsername(username);
        if (!isUsernameValid) return res.status(400).json("Username is not valid");

        const isPasswordValid = validatePassword(password);
        if (!isPasswordValid) return res.status(400).json("Password is not valid");

        const dbData = await pool.query("SELECT id, password FROM users WHERE username=$1", [username]);
        if (!dbData.rows[0]) return res.status(400).json("Username and password do not match");

        const userId = dbData.rows[0].id;
        const hash = dbData.rows[0].password;

        const isPasswordVerified = bcrypt.compareSync(password, hash);
        if (!isPasswordVerified) return res.status(400).json("Username and password do not match");

        req.session.user = { userId };

        res.status(200).json("You have successfully loged in");

    } catch (error) {
        console.error(error.message);
    }
})

module.exports = router;