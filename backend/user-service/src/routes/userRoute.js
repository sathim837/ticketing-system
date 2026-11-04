import express from "express";
import { registerUser, loginUser, getUserProfile, getAdmins } from "../controllers/userController.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../validators/userValidator.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { authenticateService } from "../middlewares/internalServiceAuth.js";

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

router.get(
  "/internal/admins",
  authenticateService,
  getAdmins
);

router.get(
  "/admin-test",
  authenticateUser,
  authorizeRoles("ADMIN"),
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Welcome Admin",
      data: null,
    });
  }
);

export default router;