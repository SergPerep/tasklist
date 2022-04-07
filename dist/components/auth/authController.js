"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = __importDefault(require("../../configs/dbConnection"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Utils
const genHash_1 = __importDefault(require("../../utils/genHash"));
const checkWhetherUserAlreadyExists_1 = __importDefault(require("../../utils/checkWhetherUserAlreadyExists"));
const validateUsername_1 = __importDefault(require("../../utils/validateUsername"));
const validatePassword_1 = __importDefault(require("../../utils/validatePassword"));
const customErrors_1 = require("../../utils/customErrors");
const setupNewAccount_1 = __importDefault(require("../../utils/setupNewAccount"));
const auth_register_post = async (req, res, next) => {
    try {
        if (req.session?.user?.userId)
            return next(new customErrors_1.ForbiddenError("You are already authenticated"));
        const { username, password } = req.body;
        if (!username || username.length === 0)
            return next(new customErrors_1.MissingCredentialsError("username"));
        if (!password || password.length === 0)
            return next(new customErrors_1.MissingCredentialsError("password"));
        const isUserAlreadyExists = await (0, checkWhetherUserAlreadyExists_1.default)(username);
        if (isUserAlreadyExists)
            return res.status(400).json({ messageToUser: "User already exists. Try login" });
        const hash = (0, genHash_1.default)(password);
        const dbData = await dbConnection_1.default.query(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`, [username, hash]);
        const userId = dbData.rows[0].id;
        req.session.user = { userId };
        await (0, setupNewAccount_1.default)(userId);
        res.status(200).json({ isAuthenticated: true });
    }
    catch (error) {
        console.error(error.stack);
    }
};
const auth_login_post = async (req, res, next) => {
    try {
        if (req.session?.user?.userId)
            return next(new customErrors_1.ForbiddenError("You are already authenticated"));
        const { username, password } = req.body;
        if (!username || username.length === 0)
            return next(new customErrors_1.MissingCredentialsError("username"));
        if (!password || password.length === 0)
            return next(new customErrors_1.MissingCredentialsError("password"));
        const isUsernameValid = (0, validateUsername_1.default)(username);
        if (!isUsernameValid)
            return res.status(400).json({ messageToUser: "Username is not valid" });
        const isPasswordValid = (0, validatePassword_1.default)(password);
        if (!isPasswordValid)
            return res.status(400).json({ messageToUser: "Password is not valid" });
        const dbData = await dbConnection_1.default.query("SELECT id, password FROM users WHERE username=$1", [username]);
        if (!dbData.rows[0])
            return res.status(400).json({ messageToUser: "Username and password do not match" });
        const userId = dbData.rows[0].id;
        const hash = dbData.rows[0].password;
        const isPasswordVerified = bcryptjs_1.default.compareSync(password, hash);
        if (!isPasswordVerified)
            return res.status(400).json({ messageToUser: "Username and password do not match" });
        req.session.user = { userId };
        res.status(200).json({ isAuthenticated: true });
    }
    catch (error) {
        console.error(error.message);
    }
};
const auth_logout_get = (req, res) => {
    req.session.destroy(err => { if (err)
        throw err; });
    res.clearCookie('sid');
    res.status(200).json({ isAuthenticated: false });
};
const auth_checkAuth_get = (req, res) => {
    const isAuthenticated = !!req.session?.user?.userId;
    return res.status(200).json({ isAuthenticated });
};
exports.default = {
    auth_register_post,
    auth_login_post,
    auth_logout_get,
    auth_checkAuth_get
};
