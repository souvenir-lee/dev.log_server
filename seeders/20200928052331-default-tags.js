/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'tags',
      [
        {
          name: 'fruit',
        },
        {
          name: 'knock knock',
        },
        {
          name: 'dev',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'tags',
      {
        name: {
          [Op.in]: ['fruit', 'knock knock', 'dev'],
        },
      },
      {}
    );
  },
};
