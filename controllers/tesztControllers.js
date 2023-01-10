const fsPromises = require('fs').promises;
const path = require('path');

exports.getTeszt = async (req, res) => {
    const ut = path.join(__dirname, '..', 'data', 'kerdoivek.json');
    const belepUt = path.join(__dirname, '..', 'data', 'belep.json');
    const cimek = req.query.cim;
    const cim = cimek.split('_')[0];
    const oktato = cimek.split('_')[1];

    try {
        const kerdoiv = await fsPromises.readFile(ut, { encoding: 'utf-8' });
        const tomb = await JSON.parse(kerdoiv);
        const belep = await fsPromises.readFile(belepUt, { encoding: 'utf-8' });
        const { statusz, azon, osztaly } = JSON.parse(belep);

        let oszt = '';

        if (osztaly.startsWith('9a')) {
            oszt = '9a';
        } else if (osztaly.startsWith('9b')) {
            oszt = '9b';
        } else if (osztaly.startsWith('10a')) {
            oszt = '10a';
        } else if (osztaly.startsWith('10b')) {
            oszt = '10b';
        } else if (osztaly.startsWith('11a')) {
            oszt = '11a';
        } else if (osztaly.startsWith('11b')) {
            oszt = '11b';
        } else if (osztaly.startsWith('12a')) {
            oszt = '12a';
        } else if (osztaly.startsWith('12b')) {
            oszt = '12b';
        } else {
            oszt = 'iskola';
        }

        let vanE = false;

        const osztalyUt = path.join(
            __dirname,
            '..',
            'eredmenyek',
            `${oszt}.json`
        );

        const osztData = await fsPromises.readFile(osztalyUt, {
            encoding: 'utf-8',
        });
        const osztTomb = JSON.parse(osztData);

        if (oktato) {
            for (let i = 0; i < osztTomb.length; i++) {
                if (osztTomb[i].cim === cimek && osztTomb[i].azon === azon) {
                    vanE = true;
                    break;
                }
            }
        } else {
            for (let i = 0; i < osztTomb.length; i++) {
                if (osztTomb[i].cim === cim && osztTomb[i].azon === azon) {
                    vanE = true;
                    break;
                }
            }
        }

        if (vanE) {
            res.render('talalat', { statusz });
        } else {
            let obj = {};

            for (let i = 0; i < tomb.length; i++) {
                if (tomb[i].cim === cim) {
                    obj = tomb[i];
                }
            }

            res.render('teszt', { obj, statusz, oktato });
        }
    } catch (error) {
        console.log(error.message);
        res.json({ msg: error.message });
    }
};

exports.updateTeszt = async (req, res) => {
    const ut = path.join(__dirname, '..', 'data', 'kerdoivek.json');
    const belepUt = path.join(__dirname, '..', 'data', 'belep.json');
    const cim = req.query.cim;

    try {
        const kerdoiv = await fsPromises.readFile(ut, { encoding: 'utf-8' });
        const tomb = await JSON.parse(kerdoiv);
        const belep = await fsPromises.readFile(belepUt, { encoding: 'utf-8' });
        const { statusz } = JSON.parse(belep);
        let obj = {};

        for (let i = 0; i < tomb.length; i++) {
            if (tomb[i].cim === cim) {
                obj = tomb[i];
            }
        }

        res.render('modosit', { obj, statusz });
    } catch (error) {
        console.log(error.message);
        res.json({ msg: error.message });
    }
};

exports.deleteTeszt = async (req, res) => {
    const ut = path.join(__dirname, '..', 'data', 'kerdoivek.json');
    const belepUt = path.join(__dirname, '..', 'data', 'belep.json');
    const cim = req.query.cim;
    let kerdoivek = [];

    try {
        const data = await fsPromises.readFile(ut, { encoding: 'utf-8' });
        kerdoivek = JSON.parse(data);
        const belep = await fsPromises.readFile(belepUt, { encoding: 'utf-8' });
        const { statusz } = JSON.parse(belep);

        let ujKerdoivek = kerdoivek.filter((elem) => {
            return elem.cim !== cim;
        });

        await fsPromises.writeFile(ut, JSON.stringify(ujKerdoivek), {
            encoding: 'utf-8',
            flag: 'w',
        });

        res.render('kerdoivek', { kerdoivek: ujKerdoivek, statusz });
    } catch (error) {
        console.log(error);
        res.json({ msg: error.message });
    }
};
