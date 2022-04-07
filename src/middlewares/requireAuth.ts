import { AuthenticationError } from "../utils/customErrors";
import express from "express";
export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if(!req.session?.user?.userId) return next(new AuthenticationError());
    next();
}