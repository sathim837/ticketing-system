import Ticket from "../models/Ticket.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { assignTicketToAdmin } from "../services/ticketAssignmentService.js";
import { AppError } from "../utils/AppError.js";

const createTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const assignedTo = await assignTicketToAdmin();

    const ticket = await Ticket.create({
      title,
      description,
      priority: priority || "MEDIUM",
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

const getMyTickets = async (req, res, next) => {
  try {

    const { status, priority, page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    let where = {};

    if (req.user.role == "USER") {
      where.userId = req.user.id;
    } else if (req.user.role == "ADMIN") {
      where.assignedTo = req.user.id;
    }

    if(status)
    {
      where.status = status;
    }

    if(priority)
    {
      where.priority = priority;

    }

    const { count, rows: tickets } = await Ticket.findAndCountAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return res
      .status(200)
      .json(new ApiResponse(
        200, 
        "Tickets fetched successfully", 
        {
        tickets,
        pagination : {
          totalTickets : count,
          currentPage : page,
          totalPages : Math.ceil(count/limit) ,
          limit
        }
      }
      ));
  } catch (error) {
    return next(error);
  }
};

const getMyTicketById = async (req, res, next) => {
  try {
    const id = req.params.id;
    let where = {};

    if (req.user.role == "USER") {
      where.userId = req.user.id;
    } else if (req.user.role == "ADMIN") {
      where.assignedTo = req.user.id;
    }

    where.id = id;

    const ticket = await Ticket.findOne({
      where,
    });

    if (!ticket) {
      throw new AppError("Ticket not found", 404);
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Tickets fetched successfully", ticket));
  } catch (error) {
    return next(error);
  }
};

const updateTicketStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Find ticket assigned to the logged-in admin
    const ticket = await Ticket.findOne({
      where: {
        id,
        assignedTo: req.user.id,
      },
    });

    if (!ticket) {
      throw new AppError("Ticket not found", 404);
    }

    // Validate status transition
    const allowedTransitions = {
      OPEN: ["IN_PROGRESS", "CLOSED"],
      IN_PROGRESS: ["RESOLVED", "CLOSED"],
      RESOLVED: [],
      CLOSED: [],
    };

    if (!allowedTransitions[ticket.status].includes(status)) {
      throw new AppError(
        `Cannot change ticket status from ${ticket.status} to ${status}`,
        400
      );
    }

    ticket.status = status;
    await ticket.save();

    return res.status(200).json(
      new ApiResponse(200, "Ticket status updated successfully", ticket)
    );
  } catch (error) {
    return next(error);
  }
};

export { createTicket, getMyTickets, getMyTicketById, updateTicketStatus };
