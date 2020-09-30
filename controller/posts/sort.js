const { post } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  get: (req, res) => {
    const sess = req.session; //세션정보를 가져온다. 사용자가 로그인중인지 확인하기 위함
    const item = req.params.item;

    // -----------------------------start function-----------------------------
    const orderPostAttribute = (item) => {
      post
        .findAll({
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
                Sequelize.literal(`(
                SELECT COUNT(*) FROM comments where post.id = comments.postId
              )`),
                'commentCount',
              ],
            ],
          },
          order: [[item, 'DESC']],
        })
        .then((result) => {
          if (result) {
            res.status(200).send(result);
          } else {
            res.status(404).send('not found sort list');
          }
        })
        .catch((e) => {
          res.status(500).send(e);
        });
    };

    const orderCommentCount = () => {
      post
        .findAll({
          attributes: {
            include: [
              [
                Sequelize.literal(
                  `(SELECT username FROM users where post.userId = users.id)`
                ),
                'username',
              ],
              [
                Sequelize.literal(`(
                SELECT COUNT(*) FROM comments where post.id = comments.postId
              )`),
                'commentCount',
              ],
            ],
          },
          order: Sequelize.literal('commentCount DESC'),
        })
        .then((result) => {
          if (result) {
            res.status(200).send(result);
          } else {
            res.status(200).send('not found sort list');
          }
        })
        .catch((e) => {
          res.status(500).send(e);
        });
    };
    // -----------------------------end function-----------------------------

    if (sess.userId) {
      console.log('sess.userId :::: ', sess.userId);
      if (item === 'id' || item === 'viewCount') {
        orderPostAttribute(item);
      } else if (item === 'commentCount') {
        orderCommentCount();
      }
    } else {
      //로그인 세션이 끊어져있다면
      res.redirect('/');
    }
  }, //end get
};
