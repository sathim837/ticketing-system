import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/userController.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../validators/userValidator.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.post("/register", registerUser);
router.post(
  "/register",
  validate(registerSchema),
  registerUser
);

router.post(
  "/login",
  validate(loginSchema),
  loginUser
);

router.get(
  "/profile",
  authenticateUser,
  getUserProfile
);

export default router;