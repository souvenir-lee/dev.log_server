const { comment } = require('../../models');

module.exports = {
  post: (req, res) => {
    //post 테이블 INSERT 함수
    const sess = req.session; //세션정보를 가져온다. 사용자가 로그인중인지 확인하기 위함
    const { postId, userId, message } = req.body; //게시글 작성시 요청 body에 있는 값을 가져온다

    // if (sess.userId) {
    if (true) {
      //사용자가 로그인중이라면
      comment
        .create({
          postId: postId,
          userId: userId,
          message: message,
        })
        .then((result) => {
          console.log(result);
          if (result) {
            res.status(201).send(result);
          } else {
            res.status(400).send('Invalid Request');
          }
        })
        .catch((e) => {
          res.sendStatus(500);
        });
    } else {
      //로그인 세션이 연결되어있지 않다면 홈으로
      res.redirect('/');
    }
  },
};
