const fsPromises = require('fs').promises;
const path = require('path');

exports.getMain = (req, res) => {
    res.render('index');
};
