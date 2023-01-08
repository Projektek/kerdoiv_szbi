const express = require('express');
const {
    getWhowhere,
    postWhowhere,
} = require('../controllers/whowhereControllers');
const router = express.Router();

router.get('/', getWhowhere);
router.post('/', postWhowhere);

module.exports = router;
