const express = require('express');
const { getTablazat } = require('../controllers/tablazatControllers');

const router = express.Router();

router.get('/', getTablazat);

module.exports = router;
