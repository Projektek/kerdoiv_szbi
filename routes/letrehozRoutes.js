const express = require('express');
const { postLetrehoz } = require('../controllers/letrehozControllers');
const router = express.Router();

router.post('/', postLetrehoz);

module.exports = router;
