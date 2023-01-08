const express = require('express');
const { postBelep } = require('../controllers/belepControllers');
const router = express.Router();

router.post('/', postBelep);

module.exports = router;
