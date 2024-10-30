import { ForbiddenError, MissingCredentialsError, AuthenticationError } from "../utils/customErrors";
import {Request, Response, NextFunction} from "express";

const handleErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("--> handleErrors");
    if (!err) return;
    if (err instanceof ForbiddenError || MissingCredentialsError || AuthenticationError) res.status(err.statusCode).json({ messageToUser: err.message });
    console.log(err.stack);
}

export default handleErrors;