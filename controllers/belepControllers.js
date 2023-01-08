const fsPromises = require('fs').promises;
const path = require('path');

exports.postBelep = async (req, res) => {
    const { azon, jelszo } = req.body;
    const ut = path.join(__dirname, '..', 'public', 'lista.txt');
    const belepUt = path.join(__dirname, '..', 'data', 'belep.json');

    try {
        const data = await fsPromises.readFile(ut, { encoding: 'utf-8' });
        const adatok = data.split('\n');

        if (!azon || !jelszo) {
            return res.redirect('/');
        }

        let vanE = false;
        let statusz = '';

        for (let i = 0; i < adatok.length; i++) {
            if (
                adatok[i].trim().includes(azon + '_') &&
                adatok[i].trim().includes('_' + jelszo)
            ) {
                statusz = adatok[i].trim().split('_')[1];
                vanE = true;
                break;
            }
        }

        if (vanE) {
            let osztaly = '';
            if (azon.startsWith('9a1')) {
                osztaly = '9a1';
            } else if (azon.startsWith('9a2')) {
                osztaly = '9a2';
            } else if (azon.startsWith('9b')) {
                osztaly = '9b';
            } else if (azon.startsWith('10a1')) {
                osztaly = '10a1';
            } else if (azon.startsWith('10a2')) {
                osztaly = '10a2';
            } else if (azon.startsWith('10b1')) {
                osztaly = '10b1';
            } else if (azon.startsWith('10b2')) {
                osztaly = '10b2';
            } else if (azon.startsWith('11a1')) {
                osztaly = '11a1';
            } else if (azon.startsWith('11a2')) {
                osztaly = '11a2';
            } else if (azon.startsWith('11b')) {
                osztaly = '11b';
            } else if (azon.startsWith('12a1')) {
                osztaly = '12a1';
            } else if (azon.startsWith('12a2')) {
                osztaly = '12a2';
            } else if (azon.startsWith('12b')) {
                osztaly = '12b';
            }

            await fsPromises.writeFile(
                belepUt,
                JSON.stringify({ azon, jelszo, statusz, osztaly }),
                { encoding: 'utf-8', flag: 'w' }
            );
            res.render('fooldal', { azon, statusz });
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.log(error.message);
        res.json({ msg: error.message });
    }
};
