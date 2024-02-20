// ====================================
//             Requirements
// ====================================
const { Connection } = require("tedious");
let Request = require("tedious").Request;

// connection setup
// const { connection } = require("../connection");
const config = require("./configuration");

// ====================================
//               Methods
// ====================================

createConnection = async () => {
	let newConnection = new Connection(config);

	// Events
	newConnection.on("close", function (err) {
		if (err) {
			console.log(
				"The error happened while trying to close connection to the SQL database'. " +
					err
			);
			return err;
		} else {
			console.log("Connection has closed");
			return "Connection has closed";
		}
	});

	newConnection.on("connect", function (err) {
		if (err) {
			console.log(
				"The error happened while trying to connect to the ibad portal SQL database'. " +
					err
			);
			return err;
		} else {
			console.log("Connected to MSSQL");
			return "Connected to MSSQL";
		}
	});

	return newConnection;
};

//========================//
//          Exports
//========================//
module.exports = { createConnection };
