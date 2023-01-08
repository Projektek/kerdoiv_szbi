const fsPromises = require('fs').promises;
const path = require('path');

exports.getErtekeles = async (req, res) => {
    const belepUt = path.join(__dirname, '..', 'data', 'belep.json');
    const kerdoivUt = path.join(__dirname, '..', 'data', 'kerdoivek.json');
    const tanarUt = path.join(__dirname, '..', 'data', 'teachers.json');

    try {
        const belep = await fsPromises.readFile(belepUt, { encoding: 'utf-8' });
        const { statusz } = JSON.parse(belep);
        const kerdoivekAdat = await fsPromises.readFile(kerdoivUt, {
            encoding: 'utf-8',
        });
        const kerdoivek = JSON.parse(kerdoivekAdat);
        const tanarokAdat = await fsPromises.readFile(tanarUt, {
            encoding: 'utf-8',
        });
        const tanar = JSON.parse(tanarokAdat);

        let cimek = [];

        for (let i = 0; i < kerdoivek.length; i++) {
            cimek.push(kerdoivek[i].cim);
        }

        let tanarok = [];

        for (let i = 0; i < tanar.length; i++) {
            tanarok.push(tanar[i].nev);
        }

        res.render('ertekelesek', { statusz, cimek, tanarok });
    } catch (error) {
        console.log(error);
        res.json({ msg: error.message });
    }
};
