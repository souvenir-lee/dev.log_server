/* eslint-disable no-unused-vars */
const { post } = require('../../models');
const { user } = require('../../models');

const { member_post } = require('../../models');

module.exports = {
  get: (req, res) => {
    // req로 전송한 tag name이 붙어있는 post 리스트 제공
    const id = Number(req.params.id);

    member_post
      .findAll({
        raw: true,
        include: [
          {
            model: user,
            as: 'member',
            where: {
              id: id,
            },
            attributes: [],
          },
          {
            model: post,
            attributes: ['id', 'title'],
            include: [
              {
                model: user,
                as: 'author',
                attributes: [['username', 'taggedUser'], 'createdAt'],
              },
            ],
          },
        ],
        attributes: {
          exclude: ['id', 'memberId', 'postId'],
        },
      })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
