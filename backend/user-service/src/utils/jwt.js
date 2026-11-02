import jwt from "jsonwebtoken";

export const genearteToken = (user) => {

    return jwt.sign(
        {
            id : user.id,
            name : user.name,
            role : user.role,
            email : user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn : process.env.expiresIn || "1h"
        }
    );

}