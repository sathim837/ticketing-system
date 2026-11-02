import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Ticket = sequelize.define(
  "Ticket",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    priority: {
      type: DataTypes.ENUM("LOW", "MEDIUM", "HIGH", "URGENT"),
      allowNull: false,
      defaultValue: "MEDIUM",
    },

    status: {
      type: DataTypes.ENUM(
        "OPEN",
        "IN_PROGRESS",
        "RESOLVED",
        "CLOSED"
      ),
      allowNull: false,
      defaultValue: "OPEN",
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "tickets",
    timestamps: true,
  }
);

export default Ticket;