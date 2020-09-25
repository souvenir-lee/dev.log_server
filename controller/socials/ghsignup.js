module.exports = {
  get: (req, res) => {
    return res
      .status(301)
      .redirect(
        'https://github.com/login/oauth/authorize?client_id=be24c4949ce694ddbe08&redirect_uri=https://f469748b7080.ngrok.io/socials/ghcallback'
      );
  },
};
