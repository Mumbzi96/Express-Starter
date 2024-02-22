// ====================================
//             Requirements
// ====================================
const dotenv = require("dotenv");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const MongoStore = require("connect-mongo");
const MSSQLStore = require("connect-mssql-v2");

// ====================================
//             Configuration
// ====================================

// dotenv
dotenv.config({
	path: "./config/config.env", // Specifies dotenv
});

// ====================================
//             Object
// ====================================

// Decide on session store
let store;
if (process.env.DATABASE.toLowerCase() == "mongo") {
	// Mongo
	store = new MemoryStore({
		checkPeriod: 43200000, // prune expired entries every 12h
	});
} else if (process.env.DATABASE.toLowerCase() == "mssql") {
	console.log("MSSQL");
	// setup config
	const config = {
		user: process.env.DATABASEUSERNAME,
		password: process.env.DATABASEPASSWORD,
		server: process.env.SERVER, // You can use 'localhost\\instance' to connect to named instance
		database: process.env.DATABASENAME,
		options: {
			encrypt: process.env.DATABASE_ENCRYPTION === "true", // Use this if you're on Windows Azure
			trustServerCertificate:
				process.env.DATABASE_SESSION_TRUST_SERVER_CERTIFICATE == "true"
					? true
					: false, // use this if your MS SQL instance uses a self signed certificate
		},
	};
	// setup store
	store = new MSSQLStore(config);
} else {
	// Memory
	store = new MemoryStore({
		checkPeriod: 43200000, // prune expired entries every 12h
	});
}

let sessionOptions = {
	secret: process.env.SESSION_KEY,
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000 * 60 * 60 * 72, // Example: 72 hours
		secure: process.env.SESSION_SECURE === "true" ? true : false,
		// domain:,
		// maxAge`:,
		// secure`:true,
	},
	name: "express-app-session",
	name: process.env.SESSION_NAME,
	store,
};

// ====================================
//              Export
// ====================================

module.exports = sessionOptions;
