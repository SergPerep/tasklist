class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = "ForbiddenError";
        this.statusCode = 403;
    }
}

class MissingCredentialsError extends Error {
    constructor(missingPropertyName) {
        super();
        this.message = `Missing credential: ${missingPropertyName}`;
        this.name = this.constructor.name;
        this.statusCode = 400;
    }
}

class AuthenticationError extends Error {
    constructor() {
        super();
        this.message = "You are not authenticated";
        this.name = this.constructor.name;
        this.statusCode = 401;
    }
}

module.exports = {
    ForbiddenError,
    MissingCredentialsError,
    AuthenticationError
};