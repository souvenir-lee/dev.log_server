const { comment } = require('../../models');

module.exports = {
  post: (req, res) => {
    // const sess = req.session; //세션정보를 가져온다. 사용자가 로그인중인지 확인하기 위함
    const { id, token } = req.body.data;

    if (token) {
      // if (sess.userId) {
      //로그인 세션이 연결되어있다면
      comment
        .destroy({
          //comment 삭제
          where: {
            id: id, //전달받은 comments의 id를 검사
          },
        })
        .then((result) => {
          //존재할 시 삭제
          if (result) {
            res.status(200).send('delete comment');
          } else {
            res.status(400).send('Invalid Request');
          }
        })
        .catch(() => {
          res.sendStatus(500);
        });
      // } else {
      //   //로그인 세션이 끊어져있다면
      //   res.redirect('/');
    }
  },
};
