import User from "../models/User.js";
import bcrypt from "bcrypt";
import { AppError } from "../utils/AppError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const checkEmail = await User.findOne({
      where: { email },
    });
    if (checkEmail) {
      throw new AppError("Email is already registered", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const response = new ApiResponse(201, "User registered successfully", {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return res.status(response.statusCode).json(response);
  } catch (error) {
    // console.error("Registration error:", error);

    return next(error);
  }
};

export { registerUser };
