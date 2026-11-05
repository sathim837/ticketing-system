import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { createTicket, getMyTickets, getMyTicketById, updateTicketStatus } from "../controllers/ticketController.js";
import { validate } from "../middlewares/validate.js";
import { createTicketSchema, updateTicketStatusSchema, ticketFilterSchema } from "../validators/ticketValidator.js";

const router = express.Router();

// Temporary test route
router.post(
  "/create",
  authenticateUser,
  validate(createTicketSchema),
  createTicket
);

router.get(
  "/my-tickets",
  authenticateUser,
  validate(ticketFilterSchema, "query"),
  getMyTickets
);

router.get(
  "/my-tickets/:id",
  authenticateUser,
  getMyTicketById
);

router.patch(
  "/my-tickets/:id",
  authenticateUser,
  authorizeRoles("ADMIN"),
  validate(updateTicketStatusSchema),
  updateTicketStatus
);

export default router;