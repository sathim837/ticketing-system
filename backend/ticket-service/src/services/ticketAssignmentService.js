import { Op } from "sequelize";
import Ticket from "../models/Ticket.js";
import { getAdmins } from "./adminService.js";

const MAX_OPEN_TICKETS = 10;

export const assignTicketToAdmin = async () => {
  // 1. Fetch all admins from User Service
  const admins = await getAdmins();

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