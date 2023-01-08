const fsPromises = require('fs').promises;
const path = require('path');

exports.getWhowhere = async (req, res) => {
    const ut_1 = path.join(__dirname, '..', 'data', 'teachers.json');
    const ut_2 = path.join(__dirname, '..', 'data', 'classes.json');
    const ut_3 = path.join(__dirname, '..', 'data', 'kihol.json');
    const belepUt = path.join(__dirname, '..', 'data', 'belep.json');

    try {
        const data_1 = await fsPromises.readFile(ut_1, { encoding: 'utf-8' });
        const teachers = JSON.parse(data_1);
        const data_2 = await fsPromises.readFile(ut_2, { encoding: 'utf-8' });
        const classes = JSON.parse(data_2);
        const data_3 = await fsPromises.readFile(ut_3, { encoding: 'utf-8' });
        const kihol = JSON.parse(data_3);
        const belep = await fsPromises.readFile(belepUt, { encoding: 'utf-8' });
        const { statusz } = JSON.parse(belep);
        const osztalyok = Object.keys(kihol);
        const tanarok = Object.values(kihol);
        res.render('kihol', {
            teachers,
            classes,
            osztalyok,
            tanarok,
            statusz,
        });
    } catch (error) {
        console.log(error);
        res.json({ msg: error.message });
    }
};

exports.postWhowhere = async (req, res) => {
    const ut = path.join(__dirname, '..', 'data', 'kihol.json');

    try {
        await fsPromises.writeFile(ut, JSON.stringify(req.body), {
            encoding: 'utf-8',
            flag: 'w',
        });
        res.redirect('/kihol');
    } catch (error) {
        console.log(error);
        res.json({ msg: error.message });
    }
};
