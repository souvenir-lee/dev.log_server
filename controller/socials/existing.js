module.exports = {
  get: (req, res) => {
    return res.status(200).json({
      token: req.session.userId,
      status: 'Existing social account, logged in successfully',
    });
  },
};
