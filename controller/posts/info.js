const { post } = require('../../models');
const { user } = require('../../models');
const { member_post } = require('../../models');

module.exports = {
  get: (req, res) => {
    const sess = req.session; //세션정보를 가져온다. 사용자가 로그인중인지 확인하기 위함
    const id = Number(req.params.id);

    if (sess.userId) {
      //로그인 세션이 연결되어있다면
      post
        .findOne({
          where: {
            id: id, //전달받은 posts의 id를 검사
          },
        })
        .then((result) => {
          if (result) {
            post
              .update(
                //해당 게시글의 조회수값을 +1 증가
                { viewCount: result.dataValues.viewCount + 1 },
                {
                  where: {
                    id: id,
                  },
                }
              )
              .then(() => {
                //member_posts테이블에서 해당 게시글의 번호로 검색
                member_post
                  .findOne({
                    where: {
                      postId: id,
                    },
                  })
                  .then((result2) => {
                    //해당 게시글의 번호와 join관계에 있는 users테이블을 검색
                    user
                      .findOne({
                        where: {
                          id: result2.dataValues.userId,
                        },
                      })
                      .then((result3) => {
                        //검색결과로 나온 유저가 게시글을 쓴 user이고 이를 사용해 결과값 객체에 username속성을 추가해서 전달
                        let result4 = result;
                        result4.dataValues['username'] = result3.username;
                        res.status(200).send(result4);
                      })
                      .catch(() => {
                        res.sendStatus(500);
                      });
                  })
                  .catch(() => {
                    res.sendStatus(500);
                  });
              })
              .catch(() => {
                res.sendStatus(500);
              });
          } else {
            res.status(404).send('not found post info');
          }
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
