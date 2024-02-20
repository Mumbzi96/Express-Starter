// ====================================
//             Requirements
// ====================================
let Request = require("tedious").Request;
const moment = require("moment");

// Connection Helper
const { createConnection } = require("../connectionMaker.js");

// Helpers
const { addObjectPropertiesToStatement } = require("../helpers/mainHelper");

// ====================================
//               Methods
// ====================================

async function getOne(tableName, columnName, columnValue) {
	let myObj = {};
	let connection = await createConnection();
	return new Promise((resolve, reject) => {
		connection.connect((err) => {
			if (err) reject(err);
			
			// Creating Request
			let request = new Request();
			request = new Request(
				"SELECT * from " +
					tableName +
					" WHERE " +
					columnName +
					" ='" +
					columnValue +
					"'",
				function (err, rowCount, rows) {
					if (err) {
						console.log(
							"The error happened in the getOne() method" + err
						);
						connection.close();
						reject(err);
					} else {
					}
				}
			);
			request.on("row", function (columns) {
				// console.log('row event has been reached');
				columns.forEach(function (column) {
					myObj[column.metadata.colName] = column.value;
				});
			});

			request.on("done", function (rowCount, more, rows) {
				// console.log("The 'done' event has been been reached");
				// console.log(rowCount + " rows returned");
			});

			// Close the connection after the final event emitted by the request, after the callback passes
			request.on("requestCompleted", function (rowCount, more) {
				console.log("req completed");
				connection.close();
				resolve(myObj);
			});
			connection.execSql(request);
		});
	});
}

async function getAll(tableName, condition, join, columnsToGet, sorting) {
	let connection = await createConnection();
	let dataArr = [];
	return new Promise((resolve, reject) => {
		connection.connect((err) => {
			if (err) reject(err);
			let statement = "";
			if (!columnsToGet) statement = "SELECT * FROM " + tableName;
			else {
				statement = `SELECT ${columnsToGet} FROM ${tableName}`;
			}
			if (join) statement += " " + join;
			if (condition) statement += " WHERE " + condition + " ";
			if (sorting) statement += " " + sorting;

			// console.log(statement)

			// Creating Request
			let request = new Request(statement, function (err, rowCount, rows) {
				if (err) {
					console.log("The error happened in the 'getAll() method'. " + err);
					connection.close();
					reject(err);
				} else {
				}
			});

			// console.log(statement);

			request.on("row", function (columns) {
				let data = {};
				columns.forEach(function (column) {
					data[column.metadata.colName] = column.value;
				});
				dataArr.push(data);
			});

			request.on("done", function (rowCount, more, rows) {
				// console.log("The 'done' event has been been reached");
				// console.log(rowCount + " rows returned");
				// console.log(rows);
			});

			// Close the connection after the final event emitted by the request, after the callback passes
			request.on("requestCompleted", function (rowCount, more) {
				console.log("req completed");
				connection.close();
				resolve(dataArr);
			});
			connection.execSql(request);
		});
	});
}

async function deleteOne(id, tableName, condition) {
	let connection = await createConnection();
	return new Promise((resolve, reject) => {
		connection.connect((err) => {
			if (err) reject(err);
			let statement = ``;
			if (condition) {
				statement = `DELETE FROM ${tableName} ${condition}`;
			} else {
				statement = `DELETE FROM ${tableName} WHERE id=${id}`;
			}

			// console.log(statement)
			// Creating request
			let request = new Request(statement, function (err, rowCount, rows) {
				if (err) {
					console.log(
						"The error happened in the 'deleteOne() posts method'. " + err
					);
					connection.close();
					reject(err);
				} else {
				}
			});

			// Close the connection after the final event emitted by the request, after the callback passes
			request.on("requestCompleted", function (rowCount, more) {
				console.log("req completed");
				connection.close();
				resolve("Done");
			});
			connection.execSql(request);
		});
	});
}

async function editOne(id, tableName, data, condition, myFile) {
	let connection = await createConnection();
	return new Promise((resolve, reject) => {
		connection.connect((err) => {
			if (err) reject(err);
			// Setting up object to be edited
			let toSave = {};
			for (property in data) {
				if (typeof data[property] == "number")
					toSave[property] = data[property];
				else if (data[property] && data[property].length != 0) {
					toSave[property] = data[property];
				} else if (data[property] == null) toSave[property] = null;
			}
			console.log(typeof null);
			// // adding file
			// if (myFile && Object.keys(myFile).length !== 0) {
			// 	toSave[myFile.fieldname] = myFile.data;
			// }

			// Setting up statement
			let statement = `UPDATE ${tableName} SET `;

			// Going through properties
			for (property in toSave) {
				// if object,data,other
				if (typeof toSave[property] == "object") {
					let x = "";
					// If object is a date
					if (
						Object.prototype.toString.call(toSave[property]) === "[object Date]"
					) {
						x = toSave[property].toISOString().slice(0, 19).replace("T", " ");
					}
					// Other objects
					else {
						x = JSON.stringify(toSave[property]);
						if (x.charAt(x.length - 1) == ",") x = x.slice(0, x.length - 1);
					}
					if (toSave[property] == "null")
						statement += property + " = N'" + x + "'" + ", ";
					else statement += property + " = " + x + ", ";
					// if property is a string
				} else if (typeof toSave[property] == "string") {
					if (toSave[property] == "on") {
						toSave[property] = true;
						statement += property + " = " + 1 + ",";
						// if number
					} else if (toSave[property] == parseInt(toSave[property]))
						statement += `${property} = ${parseInt(toSave[property])}, `;
					else statement += `${property} = N'${toSave[property]}', `;
				} else {
					statement += `${property} = ${toSave[property]}, `;
				}
			}
			statement = statement.slice(0, statement.length - 2);
			if (!condition) statement += " WHERE id = " + parseInt(id);
			else {
				statement += ` ${condition}`;
			}

			console.log(statement);

			let request = new Request(statement, function (err, rowCount, rows) {
				if (err) {
					console.log("The error happened in the 'edidata() method'. " + err);
					connection.close();
					reject(err);
				} else {
				}
			});

			// Close the connection after the final event emitted by the request, after the callback passes
			request.on("requestCompleted", function (rowCount, more) {
				console.log("req completed");
				connection.close();
				resolve("Done");
			});
			connection.execSql(request);
		});
	});
}

//========================
//          Exports
//========================

module.exports = {
	getOne,
	getAll,
	deleteOne,
	editOne,
};
