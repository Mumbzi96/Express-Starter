// ====================================
//             Requirements
// ====================================
const express = require("express");
const dotenv = require("dotenv");
const moment = require("moment");
const path = require("path");

// Routes
const testRouter = require("./routes/testRouter");
const mainRouter = require("./routes/mainRouter");

// Project-made Modules
const hbs = require("./views/helpers/handlebarsHelper");

// ====================================
//             Configuration
// ====================================

// Init
const app = express();

// dotenv
dotenv.config({
	path: "./config/config.env", // Specifies dotenv
});
let PORT = process.env.PORT || 3000; // This uses the port from the configuration file or 3000 in case the file wasn't found

//handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

// ====================================
//             Middleware
// ====================================

// Body parser
app.use(express.json()); //To use body parser for JSON
app.use(
	express.urlencoded({
		extended: true,
	})
);

// Logging - Runs on every page visit
app.use((req, res, next) => {
	console.log(`Used a ${req.method} method on ${req.url} at ${moment()} `);
	next();
});

//  Middleware
const reqLog = (req, res, next) => {
	console.log(req);
};

// Static
app.use(express.static(path.join(__dirname, "/public")));

// Seperate Routes
app.use("/test", testRouter);
app.use("/", mainRouter);
app.get("/update", (req, res, next) => {
	res.send("update");
});

// Error handling
app.use(async (err, req, res, next) => {
	console.log(err);
	res.render("main/other/errorHandler", {
		message: "An error has occured",
		err,
	});
});

// ====================================
//          Listening on ports
// ====================================

app.listen(PORT, () => {
	console.log(`Running on http://localhost:${PORT}`);
});

module.exports = { testRouter, mainRouter, hbs ,test:1};
