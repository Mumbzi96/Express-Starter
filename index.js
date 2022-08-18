// ====================================
//             Requirements
// ====================================
const express = require('express');
const dotenv = require('dotenv');
const moment = require('moment');
// Project-made Modules
const hbs = require('./views/helpers/handlebarsHelper');

// ====================================
//             Configuration
// ====================================

// Init
const app = express();

// dotenv
dotenv.config({
	path: './config/config.env', // Specifies dotenv
});
let PORT = process.env.PORT || 3000; // This uses the port from the configuration file or 3000 in case the file wasn't found

//handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

//=============================
//           Routes
//=============================
app.get('/', (req, res) => {
	res.render('main/home');
});

app.listen(7777, () => {
	console.log(`Running on http://localhost:${PORT}`);
});
