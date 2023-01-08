const fsPromises = require('fs').promises;
const path = require('path');
const { v4: uuid } = require('uuid');

exports.postLetrehoz = async (req, res) => {
    const ut = path.join(__dirname, '..', 'data', 'kerdoivek.json');
    const belepUt = path.join(__dirname, '..', 'data', 'belep.json');
    const { cim, kerdesek, valaszok } = req.body;
    const id = uuid();
    let kerdoivek = [];

    try {
        const data = await fsPromises.readFile(ut, { encoding: 'utf-8' });
        const belep = await fsPromises.readFile(belepUt, { encoding: 'utf-8' });
        const { statusz } = JSON.parse(belep);
        kerdoivek = JSON.parse(data);
        kerdoivek.push({ id, cim, kerdesek, valaszok });
        await fsPromises.writeFile(ut, JSON.stringify(kerdoivek), {
            encoding: 'utf-8',
            flag: 'w',
        });
        res.render('kerdoivek', { kerdoivek, statusz });
    } catch (error) {
        console.log(error);
        res.json({ msg: error.message });
    }
};
