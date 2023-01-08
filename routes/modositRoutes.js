const express = require('express');
const { postModosit } = require('../controllers/modositControllers');
const router = express.Router();

router.post('/', postModosit);

module.exports = router;
