const express = require('express');
const { getKerdoivek } = require('../controllers/kerdoivekControllers');

const router = express.Router();

router.get('/', getKerdoivek);

module.exports = router;
