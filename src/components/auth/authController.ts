import pool from "../../configs/dbConnection";
import bcrypt from "bcryptjs";
import {Request, Response, NextFunction} from "express";

// Utils
import genHash from "../../utils/genHash";
import checkWhetherUserAlreadyExists from "../../utils/checkWhetherUserAlreadyExists";
import validateUsername from "../../utils/validateUsername";
import validatePassword from "../../utils/validatePassword";
import { ForbiddenError, MissingCredentialsError } from "../../utils/customErrors";
import setupNewAccount from "../../utils/setupNewAccount";

const auth_register_post = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.session?.user?.userId) return next(new ForbiddenError("You are already authenticated"));

        const { username, password } = req.body;

        if (!username || username.length === 0) return next(new MissingCredentialsError("username"));
        if (!password || password.length === 0) return next(new MissingCredentialsError("password"));

        const isUserAlreadyExists = await checkWhetherUserAlreadyExists(username);
        if (isUserAlreadyExists) return res.status(400).json({ messageToUser: "User already exists. Try login" })

        const hash = genHash(password);
        const dbData = await pool.query(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`, [username, hash]);
        const userId = dbData.rows[0].id;

        req.session.user = { userId };

        await setupNewAccount(userId);

        res.status(200).json({ isAuthenticated: true });

    } catch (error: any) {
        console.error(error.stack);
    }
};

const auth_login_post = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.session?.user?.userId) return next(new ForbiddenError("You are already authenticated"));

        const { username, password } = req.body;

        if (!username || username.length === 0) return next(new MissingCredentialsError("username"));
        if (!password || password.length === 0) return next(new MissingCredentialsError("password"));

        const isUsernameValid = validateUsername(username);
        if (!isUsernameValid) return res.status(400).json({ messageToUser: "Username is not valid" });

        const isPasswordValid = validatePassword(password);
        if (!isPasswordValid) return res.status(400).json({ messageToUser: "Password is not valid" });

        const dbData = await pool.query("SELECT id, password FROM users WHERE username=$1", [username]);
        if (!dbData.rows[0]) return res.status(400).json({ messageToUser: "Username and password do not match" });

        const userId = dbData.rows[0].id;
        const hash = dbData.rows[0].password;

        const isPasswordVerified = bcrypt.compareSync(password, hash);
        if (!isPasswordVerified) return res.status(400).json({ messageToUser: "Username and password do not match" });

        req.session.user = { userId };

        res.status(200).json({ isAuthenticated: true });

    } catch (error: any) {
        console.error(error.message);
    }
}

const auth_logout_get = (req: Request, res: Response) => {
    req.session.destroy(err => { if (err) throw err });
    res.clearCookie('sid');
    res.status(200).json({ isAuthenticated: false });
};

const auth_checkAuth_get = (req: Request, res: Response) => {
    const isAuthenticated = !!req.session?.user?.userId;
    return res.status(200).json({ isAuthenticated });
};

export default {
    auth_register_post,
    auth_login_post,
    auth_logout_get,
    auth_checkAuth_get
}
