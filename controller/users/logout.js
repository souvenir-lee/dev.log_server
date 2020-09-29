module.exports = {
  post: (req, res) => {
    console.log(req.session);
    if (req.session.userId) {
      req.session.destroy();
      return res.status(200).json({
        token: null,
        status: 'Session destroyed safely',
      });
    } else {
      return res.status(400).json({
        status: 'Invalid request',
      });
    }
  },
};
