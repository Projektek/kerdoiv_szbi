const fsPromises = require('fs').promises;
const path = require('path');

exports.getTablazatok = async (req, res) => {
    const cim = req.query.cim;
    let oktato = '';
    oktato = cim.split('_')[1];
    const belepUt = path.join(__dirname, '..', 'data', 'belep.json');
    const kerdoivUt = path.join(__dirname, '..', 'data', 'kerdoivek.json');
    const kiholUt = path.join(__dirname, '..', 'data', 'kihol.json');

    try {
        const belep = await fsPromises.readFile(belepUt, { encoding: 'utf-8' });
        const { statusz } = JSON.parse(belep);
        const kerdoivekAdat = await fsPromises.readFile(kerdoivUt, {
            encoding: 'utf-8',
        });
        const kerdoivek = JSON.parse(kerdoivekAdat);
        const kiholAdat = await fsPromises.readFile(kiholUt, {
            encoding: 'utf-8',
        });
        const kihol = JSON.parse(kiholAdat);
        let holTanit = [];

        if (oktato) {
            const osztalyok = Object.keys(kihol);
            const tanarok = Object.values(kihol);
            for (let i = 0; i < tanarok.length; i++) {
                for (let j = 0; j < tanarok[i].length; j++) {
                    if (tanarok[i][j] === oktato) {
                        let oszt = '';
                        if (osztalyok[i].startsWith('9a')) {
                            oszt = '9a';
                        } else if (osztalyok[i].startsWith('9b')) {
                            oszt = '9b';
                        } else if (osztalyok[i].startsWith('10a')) {
                            oszt = '10a';
                        } else if (osztalyok[i].startsWith('10b')) {
                            oszt = '10b';
                        } else if (osztalyok[i].startsWith('11a')) {
                            oszt = '11a';
                        } else if (osztalyok[i].startsWith('11b')) {
                            oszt = '11b';
                        } else if (osztalyok[i].startsWith('12a')) {
                            oszt = '12a';
                        } else if (osztalyok[i].startsWith('12b')) {
                            oszt = '12b';
                        }

                        let vanE = false;

                        for (let k = 0; k < holTanit.length; k++) {
                            if (holTanit[k] == oszt) {
                                vanE = true;
                            }
                        }

                        if (!vanE) {
                            holTanit.push(oszt);
                        }
                    }
                }
            }

            for (let i = 0; i < holTanit.length; i++) {
                if (holTanit[i].length === 2) {
                    holTanit[i] = '0' + holTanit[i];
                }
            }

            holTanit.push('iskola');
            holTanit = holTanit.sort();

            res.render('tablazatok', { statusz, holTanit, cim, oktato });
        } else {
            holTanit.push('9a');
            holTanit.push('9b');
            holTanit.push('10a');
            holTanit.push('10b');
            holTanit.push('11a');
            holTanit.push('11b');
            holTanit.push('12a');
            holTanit.push('12b');
            holTanit.push('iskola');
            res.render('tablazatok', { statusz, holTanit, cim, oktato });
        }
    } catch (error) {
        console.log(error);
        res.json({ msg: error.message });
    }
};
