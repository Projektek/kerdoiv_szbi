const express = require('express');
const {
    getClasses,
    postClasses,
} = require('../controllers/classesControllers');
const router = express.Router();

router.get('/', getClasses);
router.post('/', postClasses);

module.exports = router;
