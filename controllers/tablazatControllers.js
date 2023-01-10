const fsPromises = require('fs').promises;
const path = require('path');
const Answer = require('../model/Answer');

exports.getTablazat = async (req, res) => {
    const cimek = req.query.cim;
    const hol = req.query.hol;
    console.log(hol);

    const cim = cimek.split('_')[0];

    try {
        const belepUt = path.join(__dirname, '..', 'data', 'belep.json');
        const belep = await fsPromises.readFile(belepUt, { encoding: 'utf-8' });
        const { statusz } = JSON.parse(belep);

        const adatBazisAdatok = await Answer.find();
        console.log(adatBazisAdatok);

        let vanE = false;

        for (let i = 0; i < adatBazisAdatok.length; i++) {
            if (
                (adatBazisAdatok[i].azon === hol &&
                    adatBazisAdatok[i].cim === cimek) ||
                (adatBazisAdatok[i].cim === cimek && hol === 'iskola')
            ) {
                vanE = true;
            }
        }

        if (vanE) {
            const cimUt = path.join(__dirname, '..', 'data', 'kerdoivek.json');
            const kerdoivekAdat = await fsPromises.readFile(cimUt, {
                encoding: 'utf-8',
            });
            const kerdoivek = await JSON.parse(kerdoivekAdat);
            let kerdesek = [];
            let valaszok = [];

            for (let i = 0; i < kerdoivek.length; i++) {
                if (kerdoivek[i].cim === cim) {
                    if (
                        Array.isArray(kerdoivek[i].kerdesek) &&
                        Array.isArray(kerdoivek[i].valaszok)
                    ) {
                        kerdesek = kerdoivek[i].kerdesek;
                        valaszok = kerdoivek[i].valaszok;
                    } else if (
                        Array.isArray(kerdoivek[i].kerdesek) &&
                        !Array.isArray(kerdoivek[i].valaszok)
                    ) {
                        kerdesek = kerdoivek[i].kerdesek;
                        valaszok.push(kerdoivek[i].valaszok);
                    } else if (
                        !Array.isArray(kerdoivek[i].kerdesek) &&
                        Array.isArray(kerdoivek[i].valaszok)
                    ) {
                        kerdesek.push(kerdoivek[i].kerdesek);
                        valaszok = kerdoivek[i].valaszok;
                    } else {
                        kerdesek.push(kerdoivek[i].kerdesek);
                        valaszok.push(kerdoivek[i].valaszok);
                    }
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
                for (let i = 0; i < adatBazisAdatok.length; i++) {
                    if (
                        adatBazisAdatok[i].azon === hol &&
                        adatBazisAdatok[i].cim === cimek
                    ) {
                        for (let j = 0; j < valaszok.length; j++) {
                            if (adatBazisAdatok[i].valaszok[k] === `${j}`) {
                                vegsoSzamok[k][j]++;
                            }
                        }
                    }
                }
            }

            if (hol === 'iskola') {
                for (let k = 0; k < kerdesek.length; k++) {
                    for (let i = 0; i < adatBazisAdatok.length; i++) {
                        if (adatBazisAdatok[i].cim === cimek) {
                            for (let j = 0; j < valaszok.length; j++) {
                                if (adatBazisAdatok[i].valaszok[k] === `${j}`) {
                                    vegsoSzamok[k][j]++;
                                }
                            }
                        }
                    }
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
