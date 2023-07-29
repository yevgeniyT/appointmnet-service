export default class SmsServiceError extends Error {
    code: number;

    constructor(message: string, code: number) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
    }
}

export class RequiredTokenError extends SmsServiceError {
    constructor() {
        super("Authentication token is missing", 103);
    }
}

export class RequiredContentError extends SmsServiceError {
    constructor() {
        super("Request data is missing", 104);
    }
}

export class InvalidAuthError extends SmsServiceError {
    constructor() {
        super("Authentication failed, token is invalid", 105);
    }
}

export class InactiveUserError extends SmsServiceError {
    constructor() {
        super(
            "User is blocked, API interaction is impossible until unblocked",
            106
        );
    }
}

export class FailedSmsSendError extends SmsServiceError {
    constructor() {
        super("Failed to send SMS message", 503);
    }
}
export class RequiredBalanceError extends SmsServiceError {
    constructor() {
        super("Insufficient balance for creating a distribution", 203);
    }
}
export class InvalidRequestError extends SmsServiceError {
    constructor() {
        super("Invalid request, check its structure and data correctness", 300);
    }
}

export class InvalidTokenError extends SmsServiceError {
    constructor() {
        super("Invalid authentication token", 301);
    }
}

export class InvalidMessageSenderError extends SmsServiceError {
    constructor() {
        super("Invalid message sender", 302);
    }
}
