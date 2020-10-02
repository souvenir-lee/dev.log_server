const express = require('express');
const router = express.Router();

const categoryController = require('../controller/category');

router.get('/', categoryController.category.get);
router.post('/', categoryController.category.post);

module.exports = router;
