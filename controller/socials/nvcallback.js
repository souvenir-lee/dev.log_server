/* eslint-disable no-unused-vars */
module.exports = {
  get: (req, res) => {
    const axios = require('axios');
    axios.defaults.withCredentials = true;
    const { user } = require('../../models');
    const jwt = require('jsonwebtoken');

    const clientID = process.env.NAVER_CLIENT_ID;
    const clientSecret = process.env.NAVER_CLIENT_SECRET;

    const code = req.query.code;

    axios({
      method: 'post',
      url: `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
      headers: {
        accept: 'application/json',
      },
    })
      .then((response) => {
        console.log(response.data);
        if (response === undefined) {
          return res.status(401).send({ status: 'Access failed' });
        }
        const accessToken = response.data.access_token;
        axios
          .get('https://openapi.naver.com/v1/nid/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((result) => {
            if (result) {
              const email = `naver.com@testuser`; // 이메일 대체
              const grantAccessToken = (status, location) => {
                const userInfo = {
                  account: email,
                  gmt: Date().split(' ')[5],
                };
                const secret = process.env.ACCESS_SECRET + Date().split(' ')[2];
                const options = {
                  expiresIn: '1d',
                  issuer: 'devlogServer',
                  subject: 'userInfo',
                };
                jwt.sign(userInfo, secret, options, function (err, token) {
                  if (err) console.log(err);
                  else {
                    req.session.userId = token;
                    return res.status(status).redirect(location);
                  }
                });
              };

              user
                .findOrCreate({
                  where: {
                    email: email,
                  },
                  defaults: {
                    username: 'naverTestUser',
                    password: 'naverTestUser',
                    token: 'N/A',
                  },
                })
                .then(([data, created]) => {
                  if (created) {
                    grantAccessToken(301, '/socials/registered');
                    // return res.status(301).redirect(`/socials/registered`);
                  } else {
                    user
                      .update(
                        {
                          token: 'N/A',
                          updatedAt: new Date(),
                        },
                        {
                          where: {
                            email: email,
                          },
                        }
                      )
                      .then((result) => {
                        if (result[0] !== 0) {
                          console.log('Date updated');
                        } else console.log('Date update error');
                      })
                      .catch((err) => {
                        res.status(500).send(err);
                      });
                    grantAccessToken(301, '/socials/existing');
                    // return res.status(301).redirect(`/socials/existing`);
                  }
                })
                .catch((err) => {
                  res.status(500).send(err);
                });
            }
          })
          .catch((err) => {
            res.status(404).send(err);
          });
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
};
