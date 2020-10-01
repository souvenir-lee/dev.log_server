/* eslint-disable no-unused-vars */
const { user } = require('../../models');
const { post } = require('../../models');
const { user_scrap_post } = require('../../models');

module.exports = {
  get: (req, res) => {
    // 즐겨찾기 리스트 요청 -> 유저
    // const userId = req.body.userId; -> 세션 유지 안 될 경우에 사용 by props
    const jwt = require('jsonwebtoken');

    if (req.session.userId) {
      const token = req.session.userId;
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_SECRET + Date().split(' ')[2]
      );
      const email = decoded.account;
      user
        .findOne({
          raw: true,
          where: {
            email: email,
          },
          attributes: ['id'],
        })
        .then((result) => {
          const userId = result.id;
          user_scrap_post
            .findAll({
              raw: true,
              include: [
                {
                  model: user,
                  attributes: ['username'],
                  where: {
                    id: userId,
                  },
                },
                {
                  model: post,
                  attributes: ['title', 'message'],
                },
              ],
            })
            .then((result) => {
              res.send(result); // status 필요
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    }
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
