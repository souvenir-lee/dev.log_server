module.exports = {
  get: (req, res) => {
    return res.json({
      token: req.session.userId,
      status: 'New social user registered successfully',
    });
    // 토큰 반환됨 -> 추후 클라이언트에서 이를 헤더에 넣어서 보내줘야 함
  },
};
