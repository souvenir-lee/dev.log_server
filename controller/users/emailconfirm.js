const { user } = require('../../models');
const session = require('express-session');

module.exports = {
  post: (req, res) => {
    
    console.log('email confirm')
    res.send('email confirm test');

  }
}