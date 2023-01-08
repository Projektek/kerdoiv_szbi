const fsPromises = require('fs').promises;
const path = require('path');

exports.getKerdoivek = async (req, res) => {
    const ut = path.join(__dirname, '..', 'data', 'kerdoivek.json');
    const belepUt = path.join(__dirname, '..', 'data', 'belep.json');
    const tanarUt = path.join(__dirname, '..', 'data', 'kihol.json');

    try {
        const belep = await fsPromises.readFile(belepUt, { encoding: 'utf-8' });
        const { statusz, osztaly } = JSON.parse(belep);
        const data = await fsPromises.readFile(ut, { encoding: 'utf-8' });
        const kerdoivek = JSON.parse(data);
        const data_tanarok = await fsPromises.readFile(tanarUt, {
            encoding: 'utf-8',
        });
        const json_tanarok = JSON.parse(data_tanarok);
        let tanarok = json_tanarok[osztaly];

        res.render('kerdoivek', { kerdoivek, statusz, tanarok });
    } catch (error) {
        console.log(error);
        res.json({ msg: error.message });
    }
};
