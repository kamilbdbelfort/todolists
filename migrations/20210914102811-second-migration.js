"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("todoItems", "todoListId", {
      type: Sequelize.INTEGER,
      references: {
        model: "todoLists",
        key: "id",
      },
      onUpdate: "CASCADE", // what to do if user.id changes
      onDelete: "SET NULL", // what to do if the user is deleted
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("todoItems", "todoListId");
  },
};
