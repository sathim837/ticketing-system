import { AppError } from "../utils/AppError.js";

export const errorHandler = (error, req, res, next) => {

    if(res.headersSent)
    {
        return next(error)
    }

    let statusCode = error.statusCode || 500;
    let message = error.message || "Internal server error";

    if (error.name === "SequelizeUniqueConstraintError") {
        statusCode = 409;
        message = "Email is already registered";
    }

    if (error.name === "SequelizeValidationError") {
        statusCode = 400;
        message = "Invalid user data";
    }

    if (!(error instanceof AppError) && statusCode >= 500) {
        console.error(error);
        message = "Internal server error";
    }

    return res.status(statusCode).json({
        success: false,
        message,
        data: null,
    });
}