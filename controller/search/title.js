const { post } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  get: (req, res) => {
    const sess = req.session; //세션정보를 가져온다. 사용자가 로그인중인지 확인하기 위함
    const item = req.params.item;

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
          title: { [Sequelize.Op.like]: '%' + item + '%' },
        },
      })
      .then((result) => {
        if (result) {
          res.status(200).send(result);
        }
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  },
};
