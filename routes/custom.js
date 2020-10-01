const express = require('express');
const router = express.Router();

const customController = require('../controller/custom');

// get list
router.get('/scrap', customController.scrap.get);

// add or remove from list
router.post('/scrap', customController.scrap.post);

router.get('/mypost', customController.mypost.get);

router.get('/tagpost', customController.tagpost.get);

module.exports = router;
