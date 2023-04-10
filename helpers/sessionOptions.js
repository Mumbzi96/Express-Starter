// ====================================
//             Requirements
// ====================================
const dotenv = require("dotenv");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);

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
	store: new MemoryStore({
		checkPeriod: 43200000, // prune expired entries every 12h
	}),
};

// ====================================
//              Export
// ====================================

module.exports = sessionOptions;
