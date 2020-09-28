/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'souvenir-lee@test.com',
          password: process.env.TEMP,
          username: 'souvenir-lee',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'sjkwan92@test.com',
          password: process.env.TEMP,
          username: 'sjkwan92',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'jhkim9513@test.com',
          password: process.env.TEMP,
          username: 'jhkim9513',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'parfumes@test.com',
          password: process.env.TEMP,
          username: 'parfumes',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'users',
      {
        username: {
          [Op.in]: ['souvenir-lee', 'sjkwan92', 'jhkim9513', 'parfumes'],
        },
      },
      {}
    );
  },
};
