/* eslint-disable no-unused-vars */
const { category } = require('../../models');

module.exports = {
  get: (req, res) => {
    category
      .findAll({
        raw: true,
      })
      .then((result) => res.status(200).send(result));
  },

  post: (req, res) => {
    const target = req.body.title;
    category
      .findOrCreate({
        raw: true,
        where: {
          title: target,
        },
      })
      .then(([data, created]) => {
        if (created) {
          res.status(200).send(`Category ${target} created`);
        } else {
          res.status(409).send(`${target} already exists`);
        }
      });
  },
};
