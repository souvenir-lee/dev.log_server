/* eslint-disable no-unused-vars */
module.exports = {
  post: (req, res) => {
    const { user } = require('../../models');
    if (
      req.body === undefined ||
      req.body.email === undefined ||
      req.body.password === undefined ||
      req.body.username === undefined
    ) {
      return res.status(400).send({ status: 'Invalid request' });
    }
    const { email, password, username } = req.body;
    user
      .findOrCreate({
        raw: true,
        where: {
          email: email,
        },
        defaults: {
          password: password,
          username: username,
        },
      })
      .then(([data, created]) => {
        if (!created) {
          return res.status(409).json({
            status: 'Existing local user',
          });
        } else {
          return res.status(201).json({
            status: 'Success, please log in',
          });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
