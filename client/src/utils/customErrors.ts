export class WrongTypeError extends Error {
    source: {};
    constructor(expectedType = "", value: any, source: {}) {
        super();
        const currentType = typeof value;
        this.message = `Expected ${expectedType} instead of ${currentType}`;
        this.name = this.constructor.name;
        this.source = source || {};
    }
}

export class EmptyValueError extends Error {
    source: {};
    constructor(message = "Should not be empty", source: {}) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        this.source = source || {};

    }
}

export class ValidationError extends Error {
    source: {};
    constructor(message = "Not valid", source: {}) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        this.source = source || {};
    }
}