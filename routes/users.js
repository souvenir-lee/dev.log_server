const express = require('express');
const router = express.Router();

const userController = require('../controller/users');

// POST
// 로그인
router.post('/login', userController.login.post);
router.get('/login', userController.login.get); // test용도

// 로그아웃
router.post('/logout', userController.logout.post);
router.get('/logout', userController.logout.post); // test 용도

// 회원가입
router.post('/signup', userController.signup.post);

// 이메일 중복 확인
router.post('/emailconfirm', userController.emailconfirm.post);

// GET
// 인포
router.get('/info', userController.info.get);

module.exports = router;
