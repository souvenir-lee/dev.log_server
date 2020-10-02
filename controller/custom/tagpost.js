/* eslint-disable no-unused-vars */
const { post } = require('../../models');
const { tag } = require('../../models');
const { post_tag } = require('../../models');

module.exports = {
  get: (req, res) => {
    // req로 전송한 tag name이 붙어있는 post 리스트 제공
    const target = req.body.tag; // =========== 조율 필요

    post_tag
      .findAll({
        raw: true,
        include: [
          {
            model: tag,
            where: {
              name: target,
            },
            attributes: ['name'],
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
