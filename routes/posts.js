const express = require('express');
const router = express.Router();

const postController = require('../controller/posts');

router.post('/', (req, res) => {
  res.send('post root');
});
// POST
// 게시글 작성
router.post('/create', postController.create.post);

//게시글 수정
// router.post('/update', postController.)

//게시글 삭제
router.post('/delete', postController.delete.post);

//GET
router.get('/info/:id', postController.info.get);

router.get('/category/:id', postController.category.get);

module.exports = router;
