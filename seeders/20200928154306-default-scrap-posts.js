/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'user_scrap_posts',
      [
        {
          userId: 1,
          postId: 1,
        },
        {
          userId: 1,
          postId: 4,
        },
        {
          userId: 1,
          postId: 3,
        },
        {
          userId: 2,
          postId: 1,
        },
        {
          userId: 2,
          postId: 5,
        },
        {
          userId: 1,
          postId: 6,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'user_scrap_posts',
      {
        userId: {
          [Op.in]: [1, 2],
        },
      },
      {}
    );
  },
};
