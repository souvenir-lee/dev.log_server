module.exports = {
  post: (req, res) => {
    const { user } = require('../../models');
    const jwt = require('jsonwebtoken');
    const crypto = require('crypto');
    if (
      req.body === undefined ||
      req.body.email === undefined ||
      req.body.password === undefined
    ) {
      return res.status(400).send({ status: 'Invalid request' });
    }
    const { email, password } = req.body;
    // console.log(req.hostname + req.ip);
    user
      .findOne({
        raw: true,
        where: {
          email: email,
          password: password,
        },
      })
      .then((data) => {
        if (data === null) {
          return res.status(404).json({ status: 'Invalid user' });
        } else {
          const refreshToken = data.token;
          if (refreshToken === null) {
            let secret = 'dev_log@@'; // env
            let hash = crypto
              .createHmac('sha256', secret)
              .update(
                String(data.username) +
                  Date().split(' ')[1] +
                  Date().split(' ')[4]
              )
              .digest('hex');
            user
              .update(
                {
                  token: hash,
                  updatedAt: new Date(),
                },
                {
                  where: {
                    email: email,
                  },
                }
              )
              .then((result) => {
                if (result[0] !== 0) console.log('refreshToken updated');
                else console.log('refreshToken error');
              })
              .catch((err) => {
                res.status(500).send(err);
              });
          }

          const { id, username } = data;

          const userInfo = { id: id, username: username };
          const secret = process.env.ACCESS_SECRET + Date().split(' ')[2];
          const options = {
            expiresIn: '1d',
            issuer: 'devlogServer',
            subject: 'userInfo',
          };

          jwt.sign(userInfo, secret, options, function (err, token) {
            // access token
            if (err) console.log(err);
            // 체크 필요
            else {
              req.session.userId = token;

              return res.status(200).json({
                token: token,
                status: 'Logged in successfully',
              });
            }
          });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
