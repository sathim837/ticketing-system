import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

export const authenticateUser = async(req, res, next) => {

    try
    {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer"))
        {
            throw new AppError("Token is required & must be Bearer", 400);
        }

        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedToken;

        next();
    }
    catch(error)
    {
        if (error instanceof AppError) {
        return next(error);
        }

        if (
        error instanceof jwt.JsonWebTokenError ||
        error instanceof jwt.TokenExpiredError
        ) {
        return next(new AppError("Invalid or expired token", 401));
        }

        return next(error);
    }
}