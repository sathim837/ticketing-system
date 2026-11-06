import { Op } from "sequelize";
import Ticket from "../models/Ticket.js";

export const processWaitingQueue = async(adminId, transaction) => {

    
    const activeTickets = await Ticket.count({
        where : {
            assignedTo : adminId,
            status : {
                [Op.in] : ["OPEN", "IN_PROGRESS"]
            }
        },
        transaction
    });

    if (activeTickets >= 10) {
    return;
    }

    const waitingTicket = await Ticket.findOne({
    where: {
        assignedTo: null,
        status: "OPEN",
    },
    order: [["createdAt", "ASC"]],
    transaction,
    });

    if (!waitingTicket) {
    return;
    }

    waitingTicket.assignedTo = adminId;

    await waitingTicket.save({ transaction });

}