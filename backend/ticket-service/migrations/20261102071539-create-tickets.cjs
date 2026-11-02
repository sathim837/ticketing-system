'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("tickets", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      priority: {
        type: Sequelize.ENUM("LOW", "MEDIUM", "HIGH", "URGENT"),
        allowNull: false,
        defaultValue: "MEDIUM",
      },

      status: {
        type: Sequelize.ENUM(
          "OPEN",
          "IN_PROGRESS",
          "RESOLVED",
          "CLOSED"
        ),
        allowNull: false,
        defaultValue: "OPEN",
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      assignedTo: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("tickets");
  }
};
