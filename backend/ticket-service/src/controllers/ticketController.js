import Ticket from "../models/Ticket.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const ticket = await Ticket.create({
      title,
      description,
      priority : priority || "MEDIUM",
      userId: req.user.id,
      assignedTo: null,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, "Ticket created successfully", ticket));
  } catch (error) {
    return next(error);
  }
};

export { createTicket };
