"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = __importDefault(require("../../configs/dbConnection"));
const logger_1 = __importDefault(require("../../utils/logger"));
const customErrors_1 = require("../../utils/customErrors");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validatePassword_1 = __importDefault(require("../../utils/validatePassword"));
const user_checkName_post = async (req, res) => {
    try {
        const { username } = req.body;
        if (!username)
            throw new customErrors_1.MissingCredentialsError("username");
        const dbResponse = await dbConnection_1.default.query(`SELECT id FROM users WHERE username=$1;`, [username]);
        if (dbResponse.rows[0])
            return res.json({ isUsernameExists: true });
        return res.json({ isUsernameExists: false });
    }
    catch (error) {
        logger_1.default.error(error.message);
    }
};
const user_delete = async (req, res) => {
    try {
        const { password } = req.body;
        const userId = req.session?.user?.userId;
        const isPasswordValid = (0, validatePassword_1.default)(password);
        if (!isPasswordValid)
            res.status(400).json({ messageToUser: "Wrong password" });
        const getPass = await dbConnection_1.default.query("SELECT password FROM users WHERE id=$1", [userId]);
        const hash = getPass.rows[0].password;
        if (!hash)
            return res.status(500);
        const isPasswordVerified = bcryptjs_1.default.compareSync(password, hash);
        if (!isPasswordVerified)
            return res.status(400).json({ messageToUser: "Wrong password" });
        await dbConnection_1.default.query("DELETE FROM task WHERE user_id=$1", [userId]);
        await dbConnection_1.default.query("DELETE FROM folder WHERE user_id=$1", [userId]);
        await dbConnection_1.default.query("DELETE FROM users WHERE id=$1", [userId]);
        req.session.destroy(err => { if (err)
            throw err; });
        res.clearCookie('sid');
        res.status(200).json({ isAuthenticated: false });
    }
    catch (error) {
        logger_1.default.error(error.message);
    }
};
exports.default = {
    user_checkName_post,
    user_delete
};
