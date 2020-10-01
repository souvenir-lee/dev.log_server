const { post } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  get: (req, res) => {
    const sess = req.session; //세션정보를 가져온다. 사용자가 로그인중인지 확인하기 위함
    const id = Number(req.params.id);

    if (sess.userId) {
      //로그인 세션이 연결되어있다면
      post
        .findAll({
          attributes: {
            include: [
              //게시글 작성자의 'username'과 해당 게시글에 달린 댓글 수 'commentCount'를 응답 객체에 추가
              [
                Sequelize.literal(
                  `(SELECT username FROM users where post.authorId = users.id)`
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
          where: {
            categoryId: id, //전달받은 categories의 id를 검사
          },
        })
        .then((result) => {
          if (result) {
            res.status(200).send(result); //존재한다면 해당 id의 post 값을 전달
          } else {
            res.status(404).send('not found select category list');
          }
        })
        .catch(() => {
          res.sendStatus(500);
        });
    }
  },
};
