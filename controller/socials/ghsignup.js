module.exports = {
  get: (req, res) => {
    return res
      .status(301)
      .redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}`
      );
  },
};
