module.exports = {
  post: (req, res) => {
    const { user } = require('../../models');
    const jwt = require('jsonwebtoken');
    const crypto = require('crypto');
    const Sequelize = require('sequelize');
    if (
      req.body === undefined ||
      req.body.email === undefined ||
      req.body.password === undefined
    ) {
      return res.status(400).send({ status: 'Invalid request' });
    }
    const { email, password } = req.body;
    // access token과 함께 userData return을 위한 callback 함수
    const grantAccessToken = (userData) => {
      const userInfo = { account: email, gmt: Date().split(' ')[5] };
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
          userData['password'] ? delete userData['password'] : false;
          userData['token'] ? delete userData['token'] : false;
          // console.log(req.session);
          return res.status(200).json({
            userData: userData,
            token: token,
            status: 'Logged in successfully',
          });
        }
      });
    };

    // refresh token - true면 바로 access token 발급, false면 가입 여부 확인 후 발급
    user
      .findAll({
        raw: true,
        where: {
          token: { [Sequelize.Op.ne]: null || 'N/A' },
        },
      })
      .then((data) => {
        for (let i = 0; i < data.length; i += 1) {
          if (data[i].email === email) {
            grantAccessToken(data[i]);
          }
        }
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
              return res
                .status(404)
                .json({ status: 'Invalid user information' });
            } else {
              const refreshToken = data.token;
              if (refreshToken === null) {
                let secret = process.env.REFRESH_SECRET;
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
                  .then((updated) => {
                    if (updated !== 0) {
                      console.log('refreshToken updated');
                      user
                        .findOne({
                          raw: true,
                          where: {
                            email: email,
                          },
                        })
                        .then((userData) => grantAccessToken(userData))
                        .catch((err) => {
                          res.status(500).send(err);
                        });
                    } else console.log('refreshToken error');
                  })
                  .catch((err) => {
                    res.status(500).send(err);
                  });
              }
            }
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
