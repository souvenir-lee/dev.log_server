const express = require('express');
const router = express.Router();

const searchController = require('../controller/search');

router.get('/title/:item', searchController.title.get);

module.exports = router;
