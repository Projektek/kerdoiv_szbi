const fsPromises = require('fs').promises;
const path = require('path');

exports.getClasses = async (req, res) => {
    const ut = path.join(__dirname, '..', 'data', 'classes.json');
    const belepUt = path.join(__dirname, '..', 'data', 'belep.json');

    try {
        const belep = await fsPromises.readFile(belepUt, { encoding: 'utf-8' });
        const { statusz } = JSON.parse(belep);
        const data = await fsPromises.readFile(ut, { encoding: 'utf-8' });
        const classes = JSON.parse(data);

        res.render('classes', { classes, statusz });
    } catch (error) {
        console.log(error);
        res.json({ msg: error.message });
    }
};

exports.postClasses = async (req, res) => {
    const ut = path.join(__dirname, '..', 'data', 'classes.json');
    const osztalyok = Object.keys(req.body);
    const letszamok = Object.values(req.body);
    const feltolt = [];
    for (let i = 0; i < osztalyok.length; i++) {
        feltolt.push({ osztaly: osztalyok[i], letszam: letszamok[i] });
    }

    try {
        await fsPromises.writeFile(ut, JSON.stringify(feltolt), {
            encoding: 'utf-8',
            flag: 'w',
        });
        res.redirect('/classes');
    } catch (error) {
        console.log(error);
        res.json({ msg: error.message });
    }
};
