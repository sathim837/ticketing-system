import { AppError } from "../utils/AppError.js";

export const authenticateService = async(req, res, next) => {

    const serviceKey = req.headers["x-service-key"];

    if(!serviceKey || serviceKey !== process.env.INTERNAL_SERVICE_KEY)
    {
        return next(
            new AppError("Unauthorized service access", 401)
        );
    }

    return next();
}