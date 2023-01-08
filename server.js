require('dotenv').config();
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes/mainRoutes'));
app.use('/belep', require('./routes/belepRoutes'));
app.use('/classes', require('./routes/classesRoutes'));
app.use('/tanar', require('./routes/tanarRoutes'));
app.use('/kihol', require('./routes/whowhereRoutes'));
app.use('/kerdoiv', require('./routes/kerdoivRoutes'));
app.use('/kerdoivek', require('./routes/kerdoivekRoutes'));
app.use('/teszt', require('./routes/tesztRoutes'));
app.use('/letrehoz', require('./routes/letrehozRoutes'));
app.use('/modosit', require('./routes/modositRoutes'));
app.use('/kiertekel', require('./routes/kiertekelRoutes'));
app.use('/ertekeles', require('./routes/ertekelesRoutes'));
app.use('/tablazatok', require('./routes/tablazatokRoutes'));
app.use('/tablazat', require('./routes/tablazatRoutes'));
app.use('/kilep', require('./routes/kilepRoutes'));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
