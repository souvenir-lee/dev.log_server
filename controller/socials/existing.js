module.exports = {
  get: (req, res) => {
    return res.json({
      token: req.session.userId,
      status: 'Existing social account, now automatically logged-in',
    });
    // 존재하는 아이디 -> login으로 안내
  },
};
