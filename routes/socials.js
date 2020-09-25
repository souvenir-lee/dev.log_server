const express = require('express');
const router = express.Router();

const socialController = require('../controller/socials');

// github 전용
router.get('/ghsignup', socialController.ghsignup.get);
router.get('/ghcallback', socialController.ghcallback.get);

// social -> 공통으로 사용 가능
router.get('/registered', socialController.registered.get);
router.get('/existing', socialController.existing.get);

module.exports = router;
