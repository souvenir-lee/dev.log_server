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
          postId: 2,
          userId: 4,
        },
        {
          postId: 3,
          userId: 3,
        },
        {
          postId: 4,
          userId: 3,
        },
        {
          postId: 5,
          userId: 2,
        },
        {
          postId: 6,
          userId: 4,
        },
        {
          postId: 7,
          userId: 1,
        },
        {
          postId: 8,
          userId: 2,
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
        userId: {
          [Op.in]: [1, 2, 3, 4],
        },
      },
      {}
    );
  },
};
