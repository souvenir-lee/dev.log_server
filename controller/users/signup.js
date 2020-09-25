/* eslint-disable no-unused-vars */
module.exports = {
  post: (req, res) => {
    const { user } = require('../../models');
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
          return res.status(200).json({
            status: `Success, please log-in`,
          });
        }
      });
  },
};
