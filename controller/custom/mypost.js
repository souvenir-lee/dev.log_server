/* eslint-disable no-unused-vars */
const { post } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  get: (req, res) => {
    const id = Number(req.params.id); // ========= client와 추가 조율 필요(custom, 내가 쓴 글)
    console.log(req.params);

    post
      .findAll({
        //posts 테이블 전체 탐색
        raw: true,
        where: {
          authorId: id,
        },
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
    // }
  },
};
