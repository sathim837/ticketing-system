import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const AssignmentLock = sequelize.define(
  "AssignmentLock",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    tableName: "assignment_locks",
    timestamps: true,
  }
);

export default AssignmentLock;