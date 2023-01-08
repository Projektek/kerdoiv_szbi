const fsPromises = require('fs').promises;
const path = require('path');

exports.getTanar = async (req, res) => {
    const ut = path.join(__dirname, '..', 'data', 'teachers.json');
    const belepUt = path.join(__dirname, '..', 'data', 'belep.json');

    try {
        const belep = await fsPromises.readFile(belepUt, { encoding: 'utf-8' });
        const { statusz } = JSON.parse(belep);
        const data = await fsPromises.readFile(ut, { encoding: 'utf-8' });
        const teachers = JSON.parse(data);
        res.render('teachers', { teachers, statusz });
    } catch (error) {
        console.log(error);
        res.json({ msg: error.message });
    }
};

exports.postTanar = async (req, res) => {
    const { id, nev } = req.body;
    const ut = path.join(__dirname, '..', 'data', 'teachers.json');
    let teachers = [];

    try {
        const data = await fsPromises.readFile(ut, { encoding: 'utf-8' });
        teachers = JSON.parse(data);
        teachers.push({ id: Number(id), nev });
        await fsPromises.writeFile(ut, JSON.stringify(teachers), {
            encoding: 'utf-8',
            flag: 'w',
        });
        res.redirect('/tanar');
    } catch (error) {
        console.log(error);
        res.json({ msg: error.message });
    }
};
