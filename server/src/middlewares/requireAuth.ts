import { AuthenticationError } from "../utils/customErrors";
import { Request, Response, NextFunction } from "express";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.session);
    if (!req.session?.user?.userId) return next(new AuthenticationError());
    next();
}

export default requireAuth;