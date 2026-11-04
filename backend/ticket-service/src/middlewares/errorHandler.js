import { AppError } from "../utils/AppError.js";

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";

  if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    message = "Invalid ticket data";
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 409;
    message = "Duplicate record";
  }

  if (!(err instanceof AppError) && statusCode >= 500) {
    console.error(err);
    message = "Internal server error";
  }

  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
};