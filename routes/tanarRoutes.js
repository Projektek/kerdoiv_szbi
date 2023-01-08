const express = require('express');
const { postTanar, getTanar } = require('../controllers/tanarControllers');
const router = express.Router();

router.get('/', getTanar);
router.post('/', postTanar);

module.exports = router;
