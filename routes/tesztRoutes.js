const express = require('express');
const {
    getTeszt,
    updateTeszt,
    deleteTeszt,
} = require('../controllers/tesztControllers');
const router = express.Router();

router.get('/', getTeszt);
router.get('/modosit', updateTeszt);
router.get('/torol', deleteTeszt);

module.exports = router;
