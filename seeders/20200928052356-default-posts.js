/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'posts',
      [
        {
          categoryId: 1,
          authorId: 1,
          title: '포스트 1 카테고리 1',
          message: '포스트 테스트 1번입니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: 1,
          authorId: 4,
          title: '포스트 2 카테고리 1',
          message: '포스트 테스트 2번 테스트입니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: 1,
          authorId: 3,
          title: '포스트 3 카테고리 1',
          message: '포스트 테스트 3번입니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: 2,
          authorId: 3,
          title: '포스트 4 카테고리 2 테스트',
          message: '메세지 NOT NULL',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: 2,
          authorId: 2,
          title: '포스트 5 카테고리 2 테스트',
          message: '메세지 NOT NULL',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: 2,
          authorId: 4,
          title: '포스트 6 카테고리 2 테스트',
          message: '메세지 NOT NULL',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: 2,
          authorId: 1,
          title: '포스트 7 카테고리 2 테스트',
          message: '메세지 NOT NULL',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: 3,
          authorId: 2,
          title: '포스트 8 카테고리 3 테스트',
          message: '메세지 NOT NULL',
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
      'posts',
      {
        authorId: {
          [Op.in]: [1, 2, 3, 4],
        },
      },
      {}
    );
  },
};
