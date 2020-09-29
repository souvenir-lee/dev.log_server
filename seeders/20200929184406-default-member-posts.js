/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'member_posts',
      [
        {
          postId: 1,
          userId: 1,
        },
        {
          postId: 1,
          userId: 2,
        },
        {
          postId: 1,
          userId: 3,
        },
        {
          postId: 1,
          userId: 4,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'member_posts',
      {
        postId: {
          [Op.in]: [1],
        },
      },
      {}
    );
  },
};
