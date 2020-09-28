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
      const gmt = decoded.gmt;
      if (Date().split(' ')[5] === gmt) {
        user
          .findOne({
            raw: true,
            where: {
              email: email,
            },
            attributes: {
              exclude: ['password'],
            },
          })
          .then((data) => {
            if (data.token !== null || data.token !== 'N/A') {
              data.token = true;
            } else {
              data.token = false;
            }
            console.log(req.session.userId);
            return res.status(200).json(data);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      } else {
        return res.status(403).json({ status: 'Access denied' });
      }
    } else {
      return res.status(401).json({ status: 'Access not authorized' });
    }
  },
};
