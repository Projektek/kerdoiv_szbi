const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    azon: String,
    cim: String,
    valaszok: Array,
});

module.exports = mongoose.model('answer', answerSchema);
