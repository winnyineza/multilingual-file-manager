export interface ApiError {
  status: string;
  message: string;
  statusCode: number;
}

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public status: string = 'error'
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
} 