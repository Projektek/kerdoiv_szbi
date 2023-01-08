const express = require('express');
const {
    getKiertekel,
    postKiertekel,
} = require('../controllers/kiertekelControllers');
const router = express.Router();

router.get('/', getKiertekel);
router.post('/', postKiertekel);

module.exports = router;
