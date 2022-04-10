"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customErrors_1 = require("../utils/customErrors");
const handleErrors = (err, req, res, next) => {
    console.log("--> handleErrors");
    if (!err)
        return;
    if (err instanceof customErrors_1.ForbiddenError || customErrors_1.MissingCredentialsError || customErrors_1.AuthenticationError)
        res.status(err.statusCode).json({ messageToUser: err.message });
    console.log(err.stack);
};
exports.default = handleErrors;
