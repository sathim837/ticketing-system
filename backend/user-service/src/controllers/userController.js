import User from "../models/User.js";
import bcrypt from "bcrypt";
import { AppError } from "../utils/AppError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { genearteToken } from "../utils/jwt.js";

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

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const checkUser = await User.findOne({
      where: { email },
    });
    if (!checkUser) {
      throw new AppError("Email is not registered", 400);
    }

    const isPasswordValid = await bcrypt.compare(password, checkUser.password);
    if (!isPasswordValid) {
      throw new AppError("Password does not matched", 400);
    }

    const token = genearteToken(checkUser);

    const response = new ApiResponse(200, "User logged in successfully", {
      id: checkUser.id,
      name: checkUser.name,
      email: checkUser.email,
      role: checkUser.role,
      token: token,
    });

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password","createdAt","updatedAt"] },
    });
    if (!user) {
      throw new AppError("User not found", 400);
    }

    const response = new ApiResponse(
      200,
      "User profile fetched successfully",
      user,
    );

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return next(error);
  }
};

export { registerUser, loginUser, getUserProfile };
