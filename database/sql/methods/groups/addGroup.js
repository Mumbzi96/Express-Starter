// ====================================
//             Requirements
// ====================================
let Request = require("tedious").Request;
const moment = require("moment");

// Connection Helper
const { createConnection } = require("../../connectionMaker.js");

// Helpers
const {
	addObjectPropertiesToStatement,
	fillValuesIntoStatement,
} = require("../../helpers/mainHelper");

// ====================================
//               Methods
// ====================================

async function addGroup(group) {
	let connection = await createConnection();
	return new Promise((resolve, reject) => {
		connection.connect((err) => {
			if (err) reject(err);

			// id to return
			let id = "";

			// Setting up the statment
			let statement = `DECLARE @InsertedID TABLE (ID INT); INSERT INTO Groups ( `;
			statement = addObjectPropertiesToStatement(group, statement);
			statement = statement.replace("VALUES(", "");
			statement += ` OUTPUT INSERTED.ID INTO @InsertedID `;
			statement += "VALUES(";
			statement = fillValuesIntoStatement(group, statement);
			statement += ` SELECT ID AS GeneratedID FROM @InsertedID; `;

			// console.log(statement);

			// Setup and initiate request to sql
			let request = new Request(statement, function (err, rowCount, rows) {
				if (err) {
					console.log("The error happened in the 'addGroup() method'. " + err);
					connection.close();
					reject(err);
				} else {
				}
			});

			request.on("row", function (columns) {
				id = columns[0].value;
			});

			// Close the connection after the final event emitted by the request, after the callback passes
			request.on("requestCompleted", function (rowCount, more) {
				console.log("req completed");
				connection.close();
				resolve(id);
			});
			connection.execSql(request);
		});
	});
}

//========================
//          Exports
//========================

module.exports = {
	addGroup,
};
