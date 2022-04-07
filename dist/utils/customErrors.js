"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = exports.MissingCredentialsError = exports.ForbiddenError = void 0;
class ForbiddenError extends Error {
    statusCode = 403;
    constructor(message) {
        super(message);
        this.message = message;
        this.name = "ForbiddenError";
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}
exports.ForbiddenError = ForbiddenError;
class MissingCredentialsError extends Error {
    statusCode = 400;
    constructor(missingPropertyName) {
        super();
        this.message = `Missing credential: ${missingPropertyName}`;
        this.name = this.constructor.name;
    }
}
exports.MissingCredentialsError = MissingCredentialsError;
class AuthenticationError extends Error {
    statusCode = 401;
    constructor() {
        super();
        this.message = "You are not authenticated";
        this.name = this.constructor.name;
    }
}
exports.AuthenticationError = AuthenticationError;
