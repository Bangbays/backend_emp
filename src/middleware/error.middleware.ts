import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error("Error:", error);

  const statusCode =
    error.statusCode && typeof error.statusCode === "number"
      ? error.statusCode
      : 500;

  const message = error.message || "Internal server error";

  res.status(statusCode).json({
    status: "error",
    message: message,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
}
