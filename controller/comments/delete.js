const { comment } = require('../../models');
const { user } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
  post: (req, res) => {
    // const sess = req.session; //세션정보를 가져온다. 사용자가 로그인중인지 확인하기 위함
    const { id, token } = req.body;
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_SECRET + Date().split(' ')[2]
    );
    const email = decoded.account;
    //로그인 세션이 연결되어있다면
    if (token) {
      comment
        .findOne({
          where: {
            id: id,
          },
        })
        .then((findComment) => {
          user
            .findOne({
              where: {
                id: findComment.dataValues.userId,
              },
            })
            .then((findUser) => {
              if (findUser.dataValues.email === email) {
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
              } else {
                res.status(400).send('Invalid Request');
              }
            });
        })
        .catch(() => {
          res.sendStatus(500);
        });
    }
  },
};
