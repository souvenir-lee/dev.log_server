module.exports = {
  post: (req, res) => {
    const { user } = require('../../models');
    if (req.body === undefined || req.body.email === undefined) {
      return res.status(400).send({ status: 'Invalid request' });
    }
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
          return res.status(409).send({ status: 'Existing email address' });
        } else {
          return res.status(200).send({ status: 'Available email address' });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
