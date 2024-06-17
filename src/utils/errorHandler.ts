export class ErrorHandler extends Error {
  public statusCode: number;
  public message: string;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (
  err: ErrorHandler,
  req: any,
  res: any,
  next: any
) => {
  const { statusCode, message } = err;
  res.status(statusCode || 500).json({
    status: "error",
    statusCode,
    message,
  });
};
