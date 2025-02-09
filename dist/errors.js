"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintifyError = void 0;
class PrintifyError extends Error {
    constructor(message, statusCode, details) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.details = details;
        Object.setPrototypeOf(this, PrintifyError.prototype);
    }
}
exports.PrintifyError = PrintifyError;
