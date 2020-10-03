/* eslint-disable no-unused-vars */
const { user } = require('../../models');
const { post } = require('../../models');
const { comment } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  get: (req, res) => {
    const id = Number(req.params.id); // ========= client와 추가 조율 필요(custom, 내가 쓴 글)
    console.log(req.params);

    post
      .findAll({
        raw: true,
        where: {
          authorId: id,
        },
        attributes: [
          ['id', 'postId'],
          'title',
          ['authorId', 'userId'],
          'message',
        ],
        include: [
          {
            model: comment,
            // required: true,
            attributes: [
              ['id', 'commentId'],
              ['message', 'comment'],
              ['userId', 'commentUserId'],
            ],
          },
        ],
      })
      .then((result) => res.send(result));
  },
};
