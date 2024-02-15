// ====================================
//             Requirements
// ====================================
const express = require("express");
const dotenv = require("dotenv");
const moment = require("moment");
const path = require("path");
const session = require("express-session");

// Routes
const testRouter = require("./routes/testRouter");
const mainRouter = require("./routes/mainRouter");

// Project-made Modules
const hbs = require("./views/helpers/handlebarsHelper"); // handlebars helper
const sessionOptions = require("./helpers/sessionOptions");
const usersRouter = require("./routes/usersRouter");

// ====================================
//             Configuration
// ====================================

// Init
const app = express();

// dotenv
dotenv.config({
	path: "./config/config.env", // Specifies dotenv
});

// Port from env
let PORT = process.env.PORT || 3000; // This uses the port from the configuration file or 3000 in case the file wasn't found

//handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

// ====================================
//             Middleware
// ====================================

// Sessions
app.use(session(sessionOptions));

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
app.use("/users", usersRouter);
app.use("/", mainRouter);

// Error handling
app.use(async (err, req, res, next) => {
	console.log(err);
	res.render("main/test/error", {
		message: "An error has occured",
		code:404,
		err,
	});
});

// ====================================
//          Listening on ports
// ====================================

const isHTTPS = process.env.IS_HTTPS;
const isPFX = process.env.IS_PFX;
const passphrase = process.env.PASSPHRASE;

// http
if (isHTTPS != "true")
	app.listen(PORT, () => {
		console.log(`Running on http://localhost:${PORT}`);
	});

// https
// for certifications, either change the file locations below or create a folder "cert" and put the files there
if (isHTTPS == "true") {
	let sslServer;
	if (isPFX != "true")
		sslServer = https.createServer(
			{
				key: fs.readFileSync("./cert/privateKey.key"),
				cert: fs.readFileSync("./cert/certificate.crt"),
			},
			app
		);
	else
		sslServer = https.createServer(
			{
				pfx: fs.readFileSync("./cert/PFXFile.pfx"),
				passphrase: passphrase,
			},
			app
		);

	sslServer.listen(PORT, () =>
		console.log(`Listening on  https://localhost:${PORT}`)
	);
}