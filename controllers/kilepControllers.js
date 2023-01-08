const fsPromises = require('fs').promises;
const path = require('path');

exports.getKilep = async (req, res) => {
    const belepUt = path.join(__dirname, '..', 'data', 'belep.json');

    try {
        await fsPromises.writeFile(belepUt, JSON.stringify({}), {
            encoding: 'utf-8',
            flag: 'w',
        });

        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.json({ msg: error.message });
    }
};
