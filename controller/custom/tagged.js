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
            attributes: ['username'],
          },
          {
            model: post,
            attributes: ['id', 'title'],
          },
        ],
      })
      .then((result) => {
        res.send(result);
      });
  },
};
