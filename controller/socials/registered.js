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
      const email = decoded.account;
      user
        .findOne({
          raw: true,
          where: {
            email: email,
          },
          attributes: {
            exclude: ['password', 'token'],
          },
        })
        .then((userData) => {
          return res.status(201).json({
            userData: userData,
            token: req.session.userId,
            status: 'New social user registered successfully',
          });
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    } else {
      //
    }
  },
};
