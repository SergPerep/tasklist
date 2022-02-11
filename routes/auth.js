const router = require("express").Router();
const bcrypt = require("bcryptjs");
const pool = require("../db");
const requireAuth = require("../middlewares/requireAuth");

// Utils
const genHash = require("../utils/genHash");
const checkWhetherUserAlreadyExists = require("../utils/checkWhetherUserAlreadyExists");
const validateUsername = require("../utils/validateUsername");
const validatePassword = require("../utils/validatePassword");
const { ForbiddenError, MissingCredentialsError } = require("../utils/customErrors");

router.post("/register", async (req, res, next) => {
    try {
        if (req.session?.user?.userId) return next(new ForbiddenError("You are already authenticated"));

        const { username, password } = req.body;

        if (!username || username.length === 0) return next(new MissingCredentialsError("username"));
        if (!password || password.length === 0) return next(new MissingCredentialsError("password"));

        const isUserAlreadyExists = await checkWhetherUserAlreadyExists(username);
        if (isUserAlreadyExists) return res.status(400).json("User already exists. Try login")

        const hash = genHash(password);
        const dbData = await pool.query(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`, [username, hash]);
        const userId = dbData.rows[0].id;

        req.session.user = { userId };

        res.status(200).json({ isAuthenticated: true });

    } catch (error) {
        console.error(error.stack);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        if (req.session?.user?.userId) return next(new ForbiddenError("You are already authenticated"));

        const { username, password } = req.body;

        if (!username || username.length === 0) return next(new MissingCredentialsError("username"));
        if (!password || password.length === 0) return next(new MissingCredentialsError("password"));

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

        res.status(200).json({ isAuthenticated: true });

    } catch (error) {
        console.error(error.message);
    }
})

router.get("/logout", requireAuth, (req, res) => {

    req.session.destroy(err => { if (err) throw err });
    res.clearCookie('sid');
    res.status(200).json({ isAuthenticated: false });

});

router.get("/check-auth", (req, res) => {
    const isAuthenticated = !!req.session?.user?.userId;
    return res.status(200).json({ isAuthenticated });
})

module.exports = router;