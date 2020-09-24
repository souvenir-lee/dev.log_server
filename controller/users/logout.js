module.exports = {
  post: (req, res) => {
    req.session.destroy();
    return res.json({
      token: null,
      status: 'Session destroyed safely',
    });
  },
  // get은 테스트 용도
  get: (req, res) => {
    req.session.destroy();
    res.json({
      token: null,
      status: 'Session destroyed safely',
    });
  },
};
