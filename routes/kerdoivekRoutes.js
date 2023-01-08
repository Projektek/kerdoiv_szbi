const express = require('express');
const { getKerdoivek } = require('../controllers/kerdoivekcontrollers');

const router = express.Router();

router.get('/', getKerdoivek);

module.exports = router;
