const express = require('express');
const router = express.Router();

const userController = require('../controller/users');

router.post('/login', userController.login.post);
router.post('/logout', userController.logout.post);
router.post('/signup', userController.signup.post);
router.post('/emailconfirm', userController.emailconfirm.post);
router.get('/info', userController.info.get);

module.exports = router;
