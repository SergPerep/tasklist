import { ForbiddenError, MissingCredentialsError, AuthenticationError } from "../utils/customErrors";
import express from "express";

export default (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("--> handleErrors");
    if (!err) return;
    if (err instanceof ForbiddenError || MissingCredentialsError || AuthenticationError) res.status(err.statusCode).json({ messageToUser: err.message });
    console.log(err.stack);
}