module.exports = {
  get: (req, res) => {
    const { user } = require('../../models');
    const jwt = require('jsonwebtoken');

    if (req.session.userId) {
      const token = req.session.userId;
      const decoded = jwt.verify(
        token,
        'devlog@@secret' + Date().split(' ')[2] // env
      );
      const username = decoded.username;
      user
        .findOne({
          raw: true,
          where: {
            username: username,
          },
          attributes: {
            exclude: ['password'],
          },
        })
        .then((data) => {
          return res.json(data);
        });
    } else {
      return res.json({ status: 'Access not authorized' });
    }
  },
};
