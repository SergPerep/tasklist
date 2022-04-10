"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customErrors_1 = require("../utils/customErrors");
const requireAuth = (req, res, next) => {
    if (!req.session?.user?.userId)
        return next(new customErrors_1.AuthenticationError());
    next();
};
exports.default = requireAuth;
