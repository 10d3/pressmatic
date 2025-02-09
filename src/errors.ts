export class PrintifyError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public details?: unknown
  ) {
    super(message);
    Object.setPrototypeOf(this, PrintifyError.prototype);
  }
}

export interface ApiErrorResponse {
  code?: number;
  message?: string;
  errors?: Record<string, string[]>;
}
