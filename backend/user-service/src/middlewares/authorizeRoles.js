import { AppError } from "../utils/AppError.js";

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError("Please authenticate first", 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError("You are not authorized to access this resource", 403)
      );
    }

    next();
  };
};