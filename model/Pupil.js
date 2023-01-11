const mongoose = require('mongoose');

const pupilSchema = new mongoose.Schema({
    azon: String,
    cim: Array,
});

module.exports = mongoose.model('pupil', pupilSchema);
