// ====================================
//             Requirements
// ====================================
const dotenv = require("dotenv");

// ====================================
//              Configuration
// ====================================

// Configuration dotenv
dotenv.config({
	path: "./config/config.env",
});

//========================//
//          Main
//========================//

// Main module to export...
config = {
	server: process.env.SERVER, // or "localhost"
	authentication: {
		type: "default",
		options: {
			userName: process.env.DATABASEUSERNAME,
			password: process.env.DATABASEPASSWORD,
		},
	},
	options: {
		// trustServerCertificate: true,
		// database: process.env.DATABASENAME,
		// port: parseInt(process.env.DATABASEPORT)
		encrypt: process.env.DATABASE_ENCRYPTION === "true",
		database: process.env.DATABASENAME,
		trustServerCertificate:
			process.env.DATABASE_TRUST_SERVER_CERTIFICATE === "true",
		port: Number(process.env.DATABASEPORT),
	},
};

//========================//
//          Exports
//========================//

module.exports = config;
