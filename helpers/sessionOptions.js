// ====================================
//             Requirements
// ====================================
const dotenv = require("dotenv");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const MongoStore = require("connect-mongo");

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
	store = MongoStore.create({
		mongoUrl: process.env.MONGO_URI + process.env.DATABASE_NAME,
	});
} else if (process.env.DATABASE.toLowerCase() == "mssql") {
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
	resave: false,
	saveUninitialized: true,
	cookie: {
		secure: true,
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
