const { post } = require('../../models');

module.exports = {
  get: (req, res) => {
    const sess = req.session; //세션정보를 가져온다. 사용자가 로그인중인지 확인하기 위함
    const id = Number(req.params.id);

    // if (sess.userid) {
    if (true) {
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
                res.status(200).send(result); //존재한다면 해당 id의 post 값을 전달
              })
              .catch(() => {
                res.status(500).send('failed to increase viewCount');
              });
          } else {
            res.status(404).send('not found post info');
          }
        })
        .catch((e) => {
          res.sendStatus(500);
        });
    }
  },
};
