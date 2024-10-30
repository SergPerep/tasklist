interface CustomError extends Error {
    statusCode: number
}

export class ForbiddenError extends Error {
    statusCode = 403;
    constructor(message: string) {
        super(message);
        this.message = message;
        this.name = "ForbiddenError";
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}

export class MissingCredentialsError extends Error {
    statusCode = 400;
    constructor(missingPropertyName: string) {
        super();
        this.message = `Missing credential: ${missingPropertyName}`;
        this.name = this.constructor.name;
        
    }
}

export class AuthenticationError extends Error {
    statusCode = 401;
    constructor() {
        super();
        this.message = "You are not authenticated";
        this.name = this.constructor.name;
    }
}