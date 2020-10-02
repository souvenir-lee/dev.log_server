module.exports = {
  post: (req, res) => {
    const { user } = require('../../models');
    const jwt = require('jsonwebtoken');

    // if (req.session.userId) { // 세션 사용 불가, 대안
    if (req.body.token) {
      const token = req.body.token; // req.session.userId;
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
            // console.log(req.session.userId);
            console.log(data);
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
