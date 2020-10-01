const express = require('express');
const router = express.Router();

const commentController = require('../controller/comments');

// POST
// 댓글 작성
router.post('/create', commentController.create.post);

// 댓글 수정
router.post('/update', commentController.update.post);

// 댓글 삭제
router.post('/delete', commentController.delete.post);

// GET
router.get('/list/:id', commentController.list.get);

module.exports = router;
