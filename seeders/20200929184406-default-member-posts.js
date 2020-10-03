/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'member_posts',
      [
        {
          postId: 1,
          memberId: 1,
        },
        {
          postId: 1,
          memberId: 2,
        },
        {
          postId: 1,
          memberId: 3,
        },
        {
          postId: 1,
          memberId: 4,
        },
        {
          postId: 2,
          memberId: 1,
        },
        {
          postId: 6,
          memberId: 1,
        },
        {
          posetId: 4,
          memberId: 4,
        },
        {
          postId: 5,
          memberId: 4,
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
