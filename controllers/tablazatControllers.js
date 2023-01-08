const fsPromises = require('fs').promises;
const path = require('path');

exports.getTablazat = async (req, res) => {
    const cimek = req.query.cim;
    const hol = req.query.hol;

    const cim = cimek.split('_')[0];

    try {
        const belepUt = path.join(__dirname, '..', 'data', 'belep.json');
        const belep = await fsPromises.readFile(belepUt, { encoding: 'utf-8' });
        const { statusz } = JSON.parse(belep);

        const osztalyUt = path.join(
            __dirname,
            '..',
            'eredmenyek',
            `${hol}.json`
        );
        const osztalyAdat = await fsPromises.readFile(osztalyUt, {
            encoding: 'utf-8',
        });

        const osztalyAdatok = await JSON.parse(osztalyAdat);

        if (osztalyAdatok.length > 0) {
            const cimUt = path.join(__dirname, '..', 'data', 'kerdoivek.json');
            const kerdoivekAdat = await fsPromises.readFile(cimUt, {
                encoding: 'utf-8',
            });
            const kerdoivek = await JSON.parse(kerdoivekAdat);
            let kerdesek = [];
            let valaszok = [];

            for (let i = 0; i < kerdoivek.length; i++) {
                if (kerdoivek[i].cim === cim) {
                    kerdesek = kerdoivek[i].kerdesek;
                    valaszok = kerdoivek[i].valaszok;
                }
            }

            let vegsoSzamok = [];

            for (let i = 0; i < kerdesek.length; i++) {
                let belso = [];
                for (let j = 0; j < valaszok.length; j++) {
                    belso.push(0);
                }
                vegsoSzamok.push(belso);
            }

            for (let k = 0; k < kerdesek.length; k++) {
                for (let i = 0; i < osztalyAdatok.length; i++) {
                    if (osztalyAdatok[i].cim === cimek) {
                        if (osztalyAdatok[i].valaszok[k] === '0') {
                            vegsoSzamok[k][0]++;
                        } else if (osztalyAdatok[i].valaszok[k] === '1') {
                            vegsoSzamok[k][1]++;
                        } else if (osztalyAdatok[i].valaszok[k] === '2') {
                            vegsoSzamok[k][2]++;
                        } else if (osztalyAdatok[i].valaszok[k] === '3') {
                            vegsoSzamok[k][3]++;
                        } else if (osztalyAdatok[i].valaszok[k] === '4') {
                            vegsoSzamok[k][4]++;
                        }
                    }
                }
            }

            for (let i = 0; i < osztalyAdatok.length; i++) {
                for (let j = 0; j < osztalyAdatok[i].valaszok.length; j++) {
                    vegsoSzamok[i][j];
                }
            }

            const mappaCim = `${cimek}_${hol}.csv`;

            let letoltesTartalom = '\ufeff;';

            for (let i = 0; i < valaszok.length; i++) {
                if (i != valaszok.length - 1) {
                    letoltesTartalom += `${valaszok[i]};`;
                } else {
                    letoltesTartalom += `${valaszok[i]}\n`;
                }
            }

            for (let j = 0; j < kerdesek.length; j++) {
                letoltesTartalom += `${kerdesek[j]};`;
                for (let n = 0; n < vegsoSzamok[j].length; n++) {
                    if (j != kerdesek.length - 1) {
                        if (n != vegsoSzamok[j].length - 1) {
                            letoltesTartalom += `${vegsoSzamok[j][n]};`;
                        } else {
                            letoltesTartalom += `${vegsoSzamok[j][n]}\n`;
                        }
                    } else {
                        if (n != vegsoSzamok[j].length - 1) {
                            letoltesTartalom += `${vegsoSzamok[j][n]};`;
                        } else {
                            letoltesTartalom += `${vegsoSzamok[j][n]}`;
                        }
                    }
                }
            }

            res.render('tablazat', {
                statusz,
                hol,
                cimek,
                mappaCim,
                kerdesek,
                valaszok,
                vegsoSzamok,
                letoltesTartalom,
            });
        } else {
            res.render('nincsadat', { statusz, hol, cimek });
        }
    } catch (error) {
        console.log(error);
        res.json({ msg: error.message });
    }
};
