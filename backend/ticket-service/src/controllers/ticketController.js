import Ticket from "../models/Ticket.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { assignTicketToAdmin } from "../services/ticketAssignmentService.js";

const createTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const assignedTo = await assignTicketToAdmin();

    const ticket = await Ticket.create({
      title,
      description,
      priority : priority || "MEDIUM",
      userId: req.user.id,
      assignedTo: assignedTo,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, "Ticket created successfully", ticket));
  } catch (error) {
    return next(error);
  }
};

export { createTicket };
