/* eslint-disable no-unused-vars */
module.exports = {
  get: (req, res) => {
    const axios = require('axios');
    const { user } = require('../../models');
    const jwt = require('jsonwebtoken');

    const clientID = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    const requestToken = req.query.code;

    axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
      headers: {
        accept: 'application/json',
      },
    }).then((response) => {
      const accessToken = response.data.access_token;
      axios
        .get('https://api.github.com/user', {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        })
        .then((result) => {
          if (result.data) {
            const { data } = result;
            console.log(data);
            const username = data.login;
            const email = `github.com@${username}`; // 깃허브 주소로 이메일 대체
            const password = data.node_id;
            user
              .findOrCreate({
                where: {
                  email: email,
                },
                defaults: {
                  username: username,
                  password: password,
                },
              })
              .then(([data, created]) => {
                const userInfo = {
                  id: data.dataValues.id,
                  username: data.dataValues.username,
                };
                const secret = 'devlog@@secret' + Date().split(' ')[2]; // env
                const options = {
                  expiresIn: '3d', // 세팅 필요
                  issuer: 'devlogServer',
                  subject: 'userInfo',
                };
                jwt.sign(userInfo, secret, options, function (err, token) {
                  if (err) console.log(err);
                  else {
                    req.session.userId = token;
                    req.session.save(function (err) {
                      return;
                    });
                  }
                });
                if (created) {
                  return res.redirect(`/socials/registered`);
                } else {
                  return res.redirect(`/socials/existing`);
                }
              });
          }
        });
    });
  },
};
