const fsPromises = require('fs').promises;
const path = require('path');

exports.getKerdoiv = async (req, res) => {
    const belepUt = path.join(__dirname, '..', 'data', 'belep.json');

    try {
        const belep = await fsPromises.readFile(belepUt, { encoding: 'utf-8' });
        const { statusz } = JSON.parse(belep);
        res.render('kerdoiv', { statusz });
    } catch (error) {
        console.log(error.message);
        res.json({ msg: error.message });
    }
};

exports.postKerdoiv = async (req, res) => {
    const belepUt = path.join(__dirname, '..', 'data', 'belep.json');
    const { kerdes, valasz } = req.body;

    try {
        const belep = await fsPromises.readFile(belepUt, { encoding: 'utf-8' });
        const { statusz } = JSON.parse(belep);
        res.render('kerdoivsablon', { kerdes, valasz, statusz });
    } catch (error) {
        console.log(error.message);
        res.json({ msg: error.message });
    }
};
