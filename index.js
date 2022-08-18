//=============================
//           Requirements
//=============================
const express = require('express');
const dotenv = require('dotenv');
// dotenv
dotenv.config({
	path: './config/config.env', // Specifies dotenv
});

// ====================================
//             Configuration
// ====================================
let PORT = process.env.PORT || 3000; // This uses the port from the configuration file or 3000 in case the file wasn't found

// Run
const app = express();

//=============================
//           Routes
//=============================
app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(7777, () => {
	console.log(`Running on http://localhost:7777`);
});
