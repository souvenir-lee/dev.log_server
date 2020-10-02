const express = require('express');
const router = express.Router();

const customController = require('../controller/custom');

// add or remove from list
router.post('/scrap', customController.scrap.post);

// get list
router.get('/scrap/:id', customController.scrap.get);
router.get('/mypost/:id', customController.mypost.get);
router.get('/tagged/:id', customController.tagged.get);

module.exports = router;
