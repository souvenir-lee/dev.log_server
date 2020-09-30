const { comment } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  get: (req, res) => {
    const sess = req.session; //세션정보를 가져온다. 사용자가 로그인중인지 확인하기 위함
    const id = Number(req.params.id);

    if (sess.userId) {
      //로그인 세션이 연결되어있다면
      comment
        .findAll({
          attributes: {
            include: [
              //해당 comments를 작성한 username을 검색하여 응답객체에 'username'이름으로 추가
              [
                Sequelize.literal(
                  `(SELECT username FROM users where comment.userId = users.id)`
                ),
                'username',
              ],
            ],
          },
          where: {
            postId: id, //전달받은 posts의 id와 comments의 postId가 같은것을 검색
          },
        })
        .then((result) => {
          if (result) {
            res.status(200).send(result); //존재한다면 해당 id의 comments 값을 전달
          } else {
            res.status(404).send('not found comment info');
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
