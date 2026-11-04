import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

export const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check whether token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Authentication token is required", 401);
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user information to request
    req.user = decoded;

    next();

  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError("Invalid or expired token", 401));
    }

    return next(error);
  }
};