const { post } = require('../../models');

module.exports = {
  get: (req, res) => {
    const sess = req.session; //세션정보를 가져온다. 사용자가 로그인중인지 확인하기 위함
    const id = Number(req.params.id);

    // if (sess.userid) {
    if (true) {
      //로그인 세션이 연결되어있다면
      post
        .findAll({
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
        .catch((e) => {
          res.sendStatus(500);
        });
    }
  },
};
