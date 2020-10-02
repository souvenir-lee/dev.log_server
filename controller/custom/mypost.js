/* eslint-disable no-unused-vars */
const { user } = require('../../models');
const { post } = require('../../models');

module.exports = {
  get: (req, res) => {
    const id = Number(req.params.userId); // ========= client와 추가 조율 필요(custom, 내가 쓴 글)
    console.log(req.params);
    post
      .findAll({
        raw: true,
        where: {
          userId: id,
        },
      })
      .then((result) => {
        res.send(result);
      });
  },
};
