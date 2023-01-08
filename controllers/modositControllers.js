const fsPromises = require('fs').promises;
const path = require('path');
const { v4: uuid } = require('uuid');

exports.postModosit = async (req, res) => {
    const ut = path.join(__dirname, '..', 'data', 'kerdoivek.json');
    const { cim, ujcim, kerdesek, valaszok } = req.body;
    const id = uuid();
    let kerdoivek = [];

    try {
        const data = await fsPromises.readFile(ut, { encoding: 'utf-8' });
        kerdoivek = JSON.parse(data);

        let ujKerdoivek = kerdoivek.filter((elem) => {
            return elem.cim !== cim;
        });

        ujKerdoivek.push({ id, cim: ujcim, kerdesek, valaszok });

        await fsPromises.writeFile(ut, JSON.stringify(ujKerdoivek), {
            encoding: 'utf-8',
            flag: 'w',
        });
        res.redirect('/kerdoivek');
    } catch (error) {
        console.log(error);
        res.json({ msg: error.message });
    }
};
