/* eslint-disable no-unused-vars */
const { user } = require('../../models');
const { post } = require('../../models');

module.exports = {
  get: (req, res) => {
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
        })
        .then((data) => {
          const id = data.id;

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
        });
    }
  },
};
