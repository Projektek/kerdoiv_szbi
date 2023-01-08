const express = require('express');
const { getKilep } = require('../controllers/kilepControllers');
const router = express.Router();

router.get('/', getKilep);

module.exports = router;
