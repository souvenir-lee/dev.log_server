module.exports = {
  get: (req, res) => {
    return res
      .status(301)
      .redirect(
        `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&state=${process.env.NAVER_CLIENT_SECRET}&redirect_uri=${process.env.NAVER_REDIRECT_URI}`
      );
  },
};
