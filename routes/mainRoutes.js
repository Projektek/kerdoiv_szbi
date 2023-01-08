const express = require('express');
const { getMain } = require('../controllers/mainControllers');
const router = express.Router();

router.get('/', getMain);

module.exports = router;
