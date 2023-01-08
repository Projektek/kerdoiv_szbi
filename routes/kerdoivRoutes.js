const express = require('express');
const {
    getKerdoiv,
    postKerdoiv,
} = require('../controllers/kerdoivControllers');
const router = express.Router();

router.get('/', getKerdoiv);
router.post('/', postKerdoiv);

module.exports = router;
