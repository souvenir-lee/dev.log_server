const { comment } = require('../../models');

module.exports = {
  post: (req, res) => {
    const sess = req.session; //세션정보를 가져온다. 사용자가 로그인중인지 확인하기 위함
    const { id, message } = req.body; //게시글 작성시 요청 body에 있는 값을 가져온다

    if (sess.userId) {
      //사용자가 로그인중이라면
      comment
        .update(
          { message: message },
          {
            where: {
              id: id,
            },
          }
        )
        .then((result) => {
          if (result) {
            res.status(200).send('success to update comment');
          } else {
            res.status(400).send('Invalid Request');
          }
        })
        .catch(() => {
          res.sendStatus(500);
        });
    } else {
      //로그인 세션이 연결되어있지 않다면 홈으로
      res.redirect('/');
    }
  },
};
