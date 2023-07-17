//This module exports a collection of custom error classes designed to facilitate error handling in an API context. Each class extends from the ApiError base class, which itself extends the built-in JavaScript Error class, and provides a statusCode, message, and optionally a source error.

export default class ApiError extends Error {
    constructor(
        readonly statusCode: number,
        readonly message: string,
        readonly source?: Error
    ) {
        super();
    }
}

export class NotFoundError extends ApiError {
    constructor(
        readonly message: string = "Not Found",
        readonly statusCode: number = 404,
        source?: Error | any
    ) {
        super(statusCode, message, source);
    }
}

export class ForbiddenError extends ApiError {
    constructor(
        readonly message: string = "Forbidden",
        readonly statusCode: number = 403,
        source?: Error | any
    ) {
        super(statusCode, message, source);
    }
}

export class InternalServerError extends ApiError {
    constructor(
        readonly message: string = "Internal Server Error",
        readonly statusCode: number = 500,
        source?: Error | any
    ) {
        super(statusCode, message, source);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(
        readonly message: string = "Unauthorized Request",
        readonly statusCode: number = 401,
        source?: Error | any
    ) {
        super(statusCode, message, source);
    }
}

export class BadRequestError extends ApiError {
    constructor(
        readonly message: string = "Bad Request",
        readonly statusCode: number = 400,
        source?: Error | any
    ) {
        super(statusCode, message, source);
    }
}
export class ConflictError extends ApiError {
    constructor(
        readonly message: string = "Conflict",
        readonly statusCode: number = 409,
        source?: Error | any
    ) {
        super(statusCode, message, source);
    }
}
