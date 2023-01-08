const express = require('express');
const { getErtekeles } = require('../controllers/ertekelesControllers');

const router = express.Router();

router.get('/', getErtekeles);

module.exports = router;
