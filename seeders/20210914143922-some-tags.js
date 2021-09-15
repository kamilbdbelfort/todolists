"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "tags",
      [
        {
          title: "New Skill",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Skills",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Thug life",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Hard Core",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "C'est la vie",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("tags", null, {});
  },
};
