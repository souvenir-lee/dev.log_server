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
            res.send('test');
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
