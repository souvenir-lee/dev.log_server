module.exports = {
  post: (req, res) => {
    const { user } = require('../../models');
    const jwt = require('jsonwebtoken');
    const { email, password } = req.body;

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
          return res.json({ status: 'invalid user' });
        } else {
          const { id, username } = data;
          const userInfo = { id: id, username: username };
          const secret = 'devlog@@secret' + Date().split(' ')[2];
          const options = {
            expiresIn: '3d', // 세팅 필요
            issuer: 'devlogServer',
            subject: 'userInfo',
          };

          jwt.sign(userInfo, secret, options, function (err, token) {
            if (err) console.log(err);
            // 체크 필요
            else {
              req.session.userId = token;
              return res.json({
                token: token,
                status: 'Logged-in successfully',
              }); // 토큰 반환됨 -> 추후 클라이언트에서 이를 헤더에 넣어서 보내줘야 함
            }
          });
        }
      });
  },
  // get은 테스트 용도
  get: (req, res) => {
    const jwt = require('jsonwebtoken');
    const token = req.session.userId;
    const decoded = jwt.verify(token, 'devlog@@secret' + Date().split(' ')[2]);
    console.log(decoded);
    res.send('test'); // 디코딩 체크
  },
};
