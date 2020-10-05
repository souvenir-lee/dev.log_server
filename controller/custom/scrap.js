/* eslint-disable no-unused-vars */
const { user } = require('../../models');
const { post } = require('../../models');
const { category } = require('../../models');
const { user_scrap_post } = require('../../models');

module.exports = {
  get: (req, res) => {
    const id = Number(req.params.id);

    user_scrap_post
      .findAll({
        raw: true,
        include: [
          {
            model: user,
            attributes: ['username'],
            where: {
              id: id,
            },
          },
          {
            model: post,
            attributes: ['title', 'message', 'createdAt', 'viewCount'],
            include: [
              {
                model: category,
                attributes: ['title'],
              },
            ],
          },
        ],
        attributes: {
          exclude: ['userId'],
        },
      })
      .then((result) => {
        res.status(200).send(result); // status 필요
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  post: (req, res) => {
    // 즐겨찾기 리스트에 추가 또는 삭제
    const userId = req.body.userId;
    const postId = req.body.postId;

    user_scrap_post
      .findOrCreate({
        raw: true,
        where: {
          userId: userId,
          postId: postId,
        },
      })
      .then(([data, created]) => {
        if (created) {
          res.send('scrap added');
        } else {
          user_scrap_post
            .destroy({
              where: {
                userId: userId,
                postId: postId,
              },
            })
            .then((result) => {
              res.send('scrap deleted');
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
