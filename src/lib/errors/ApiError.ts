export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    // maintain proper stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}
