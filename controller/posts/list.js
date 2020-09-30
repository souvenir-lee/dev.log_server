const { post } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  get: (req, res) => {
    const sess = req.session; //세션정보를 가져온다. 사용자가 로그인중인지 확인하기 위함

    if (sess.userId) {
      //로그인 세션이 연결되어있다면
      post
        .findAll({
          //posts 테이블 전체 탐색
          attributes: {
            include: [
              //게시글 작성자의 'username'과 해당 게시글에 달린 댓글 수 'commentCount'를 응답 객체에 추가
              [
                Sequelize.literal(
                  `(SELECT username FROM users where post.userId = users.id)`
                ),
                'username',
              ],
              [
                Sequelize.literal(
                  `(SELECT count(c.id) FROM comments c where c.postId = post.id)`
                ),
                'commentCount',
              ],
            ],
          },
        })
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
