module.exports = {
  get: (req, res) => {
    return res.status(201).json({
      token: req.session.userId,
      status: 'New social user registered successfully',
    });
  },
};
