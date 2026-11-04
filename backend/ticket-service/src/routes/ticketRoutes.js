import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { createTicket } from "../controllers/ticketController.js";
import { validate } from "../middlewares/validate.js";
import { createTicketSchema } from "../validators/ticketValidator.js";

const router = express.Router();

// Temporary test route
router.post(
  "/create",
  authenticateUser,
  validate(createTicketSchema),
  createTicket
);

export default router;