const express = require('express');
const { getTablazatok } = require('../controllers/tablazatokControllers');

const router = express.Router();

router.get('/', getTablazatok);

module.exports = router;
