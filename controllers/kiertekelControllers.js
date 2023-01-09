const fsPromises = require('fs').promises;
const path = require('path');

exports.getKiertekel = (req, res) => {
    res.send('get kiértékelés');
};

exports.postKiertekel = async (req, res) => {
    const belepUt = path.join(__dirname, '..', 'data', 'belep.json');
    const { cim, valaszok } = req.body;
    const cimek = cim.split('_')[0];
    console.log(cim);
    try {
        const belep = await fsPromises.readFile(belepUt, { encoding: 'utf-8' });
        const { azon, osztaly } = JSON.parse(belep);
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

        const osztalyUt = path.join(
            __dirname,
            '..',
            'eredmenyek',
            `${oszt}.json`
        );
        const iskolaUt = path.join(
            __dirname,
            '..',
            'eredmenyek',
            'iskola.json'
        );

        const osztData = await fsPromises.readFile(osztalyUt, {
            encoding: 'utf-8',
        });
        const osztTomb = JSON.parse(osztData);
        const iskolaData = await fsPromises.readFile(iskolaUt, {
            encoding: 'utf-8',
        });
        const iskolaTomb = JSON.parse(iskolaData);

        let toltAdat = {};
        if (!cim.split('_')[1]) {
            toltAdat = { azon, cim: cimek, valaszok };
        } else {
            toltAdat = { azon, cim, valaszok };
        }
        osztTomb.push(toltAdat);
        iskolaTomb.push(toltAdat);

        await fsPromises.writeFile(osztalyUt, JSON.stringify(osztTomb), {
            encoding: 'utf-8',
            flag: 'w',
        });
        await fsPromises.writeFile(iskolaUt, JSON.stringify(iskolaTomb), {
            encoding: 'utf-8',
            flag: 'w',
        });

        res.redirect('/kerdoivek');
    } catch (error) {
        console.log(error);
        res.json({ msg: error.message });
    }
};
