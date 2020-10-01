/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'post_tags',
      [
        {
          tagId: 1,
          postId: 1,
        },
        {
          tagId: 1,
          postId: 4,
        },
        {
          tagId: 1,
          postId: 7,
        },
        {
          tagId: 2,
          postId: 3,
        },
        {
          tagId: 2,
          postId: 5,
        },
        {
          tagId: 2,
          postId: 6,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'post_tags',
      {
        postId: {
          [Op.in]: [1, 2],
        },
      },
      {}
    );
  },
};
