"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Leo Messi",
          email: "leo@messi.com",
          password: "test",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dan Abramov",
          email: "dan@redux.com",
          password: "test",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Diego Maradona",
          email: "diego_m.@rip.com",
          password: "test",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ernest Hemingway",
          email: "drink@happy.com",
          password: "test",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
