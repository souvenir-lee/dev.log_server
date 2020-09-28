/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'categories',
      [
        {
          title: 'Grapefruit',
        },
        {
          title: 'Lime',
        },
        {
          title: 'Coconut',
        },
        {
          title: 'Mango',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'categories',
      {
        title: {
          [Op.in]: ['Grapefruit', 'Lime', 'Coconut', 'Mango'],
        },
      },
      {}
    );
  },
};
