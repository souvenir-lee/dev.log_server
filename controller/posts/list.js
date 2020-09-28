const { post } = require('../../models');

module.exports = {
  get: (req, res) => {
    const sess = req.session; //세션정보를 가져온다. 사용자가 로그인중인지 확인하기 위함

    // if (sess.userid) {
    if (true) {
      //로그인 세션이 연결되어있다면
      post
        .findAll() //posts 테이블 전체 탐색
        .then((result) => {
          if (result) {
            res.status(200).send(result);
          } else {
            res.status(404).send('not found post list');
          }
        })
        .catch(() => {
          res.sendStatus(500);
        });
    }
  },
};
