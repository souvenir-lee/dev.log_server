module.exports = {
  post: (req, res) => {
    const { user } = require('../../models');
    const { email } = req.body;
    user
      .findOne({
        raw: true,
        where: {
          email: email,
        },
      })
      .then((data) => {
        if (data !== null) {
          return res.status(409).send('Existing email address');
        } else {
          return res.status(200).send('Available email address'); // error 코드 확인 필요
        }
      });
  },
};
