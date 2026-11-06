import { Op } from "sequelize";
import sequelize from "../config/database.js";
import Ticket from "../models/Ticket.js";
import { getAdmins } from "./adminService.js";
import AssignmentLock from "../models/AssignmentLock.js";

const MAX_OPEN_TICKETS = 10;

export const assignTicketToAdmin = async (admins, transaction) => {

  // Acquire the assignment lock
  const lock = await AssignmentLock.findByPk(1, {
    transaction,
    lock: transaction.LOCK.UPDATE,
  });

  if (!lock) {
  throw new Error("Assignment lock row not found");
  }

  // 1. Fetch all admins from User Service
  // const admins = await getAdmins();

  if (!admins.length) {
    return null;
  }

  // 2. Count active tickets for each admin
  const adminWorkloads = await Promise.all(
    admins.map(async (admin) => {
      const activeTickets = await Ticket.count({
        where: {
          assignedTo: admin.id,
          status: {
            [Op.in]: ["OPEN", "IN_PROGRESS"],
          },
        },
         transaction,
      });

      return {
        ...admin,
        activeTickets,
      };
    })
  );

  // 3. Exclude admins who reached the limit
  const availableAdmins = adminWorkloads.filter(
    (admin) => admin.activeTickets < MAX_OPEN_TICKETS
  );

  if (!availableAdmins.length) {
    return null;
  }

  // 4. Select admin with the lowest workload
  availableAdmins.sort((a, b) => {
    if (a.activeTickets !== b.activeTickets) {
      return a.activeTickets - b.activeTickets;
    }

    return a.id - b.id;
  });

  // 5. Return selected admin ID
  return availableAdmins[0].id;
};