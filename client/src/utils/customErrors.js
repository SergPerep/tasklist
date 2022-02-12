export class WrongTypeError extends Error {
    constructor(expectedType = "", value, source = {}) {
        super();
        const currentType = typeof value;
        this.message = `Expected ${expectedType} instead of ${currentType}`;
        this.name = this.constructor.name;
        this.source = source;
    }
}

export class EmptyValueError extends Error {
    constructor(message = "Should not be empty", source = {}) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        this.source = source;
    }
}

export class ValidationError extends Error {
    constructor(message = "Not valid", source = {}) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        this.source = source;
    }
}