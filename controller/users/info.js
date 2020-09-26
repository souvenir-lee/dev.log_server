module.exports = {
  get: (req, res) => {
    const { user } = require('../../models');
    const jwt = require('jsonwebtoken');

    if (req.session.userId) {
      const token = req.session.userId;
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_SECRET + Date().split(' ')[2]
      );
      const username = decoded.username;
      user
        .findOne({
          raw: true,
          where: {
            username: username,
          },
          attributes: {
            exclude: ['password', 'token'],
          },
        })
        .then((data) => {
          return res.status(200).json(data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    } else {
      return res.status(401).json({ status: 'Access not authorized' });
    }
  },
};
