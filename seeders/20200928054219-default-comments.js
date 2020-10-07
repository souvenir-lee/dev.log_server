/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'comments',
      [
        {
          postId: 1,
          userId: 3,
          message: '모두 고생하셨습니다!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 1,
          userId: 2,
          message: 'Knock Knock',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 1,
          userId: 4,
          message: 'Dev.log',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 1,
          userId: 1,
          message: '남은 final 프로젝트도 화이팅',
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
      'comments',
      {
        userId: {
          [Op.in]: [1, 2, 3, 4],
        },
      },
      {}
    );
  },
};
