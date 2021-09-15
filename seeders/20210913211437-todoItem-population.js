"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "todoItems",
      [
        {
          task: "learn a new dribbling skill",
          deadline: "in 5 weeks",
          todoListId: 1,
          important: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "wrtie a book",
          deadline: "in 20 weeks",
          todoListId: 2,
          important: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "rest in peace",
          deadline: "infinite",
          todoListId: 3,
          important: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("todoItems", null, {});
  },
};
