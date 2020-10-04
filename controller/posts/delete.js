const { post } = require('../../models');
const { user } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
  post: (req, res) => {
    // const sess = req.session; //세션정보를 가져온다. 사용자가 로그인중인지 확인하기 위함
    const { token, id } = req.body;
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_SECRET + Date().split(' ')[2]
    );
    const email = decoded.account;
    // if (sess.userId) {
    //로그인 세션이 연결되어있다면
    if (email) {
      post
        .findOne({
          where: {
            id: id,
          },
        })
        .then((findPost) => {
          user
            .findOne({
              where: {
                id: findPost.dataValues.authorId,
              },
            })
            .then((findUser) => {
              if (findUser.dataValues.email === email) {
                post
                  .destroy({
                    //post를 삭제하므로 cascade로 연결되어있는 다른 테이블의 값들도 자동 삭제
                    where: {
                      id: id, //전달받은 posts의 id를 검사
                    },
                  })
                  .then((result) => {
                    //존재할 시 삭제
                    if (result) {
                      res.status(200).send('delete post');
                    } else {
                      res.status(400).send('Invalid Request');
                    }
                  })
                  .catch(() => {
                    res.sendStatus(500);
                  });
              } else {
                res.status(400).send('Invalid Request');
              }
            });
        })
        .catch(() => {
          res.sendStatus(500);
        });
    } else {
      //로그인 세션이 끊어져있다면
      res.redirect('/');
    }
  },
};
