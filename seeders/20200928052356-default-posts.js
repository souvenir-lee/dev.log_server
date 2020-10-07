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
          title: '코드스테이츠 Full IM 22기',
          message: '첫 번째 프로젝트!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: 1,
          authorId: 4,
          title: 'Dev.log는',
          message: '개발자 팀의 협업을 위한 개발 기록 웹 서비스입니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: 1,
          authorId: 3,
          title: 'Front-end 담당',
          message: '이한슬(팀장), 권수진',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: 2,
          authorId: 3,
          title: 'Back-end 담당',
          message: '김종환, 윤연',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: 2,
          authorId: 2,
          title: 'Runtime',
          message: 'Node.js : 12.18.4, NPM : 6.14.6',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: 2,
          authorId: 4,
          title: 'Client Repository',
          message: 'https://github.com/codestates/dev.log-client',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: 2,
          authorId: 1,
          title: 'GitHub Wiki',
          message:
            '서버측 Wiki에서 프로젝트와 관련한 더 자세한 내용을 확인할 수 있습니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: 3,
          authorId: 2,
          title: 'Knock Knock',
          message: '개발자의 문을 똑똑',
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
