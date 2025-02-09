export declare class PrintifyError extends Error {
    message: string;
    statusCode: number;
    details?: unknown | undefined;
    constructor(message: string, statusCode: number, details?: unknown | undefined);
}
export interface ApiErrorResponse {
    code?: number;
    message?: string;
    errors?: Record<string, string[]>;
}
