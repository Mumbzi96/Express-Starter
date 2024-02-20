// ====================================
//             Requirements
// ====================================
// let Connection = require("tedious").Connection;
let Request = require("tedious").Request;
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

// Connection Helper
const { createConnection } = require("./connectionMaker.js");

// ====================================
//             Configuration
// ====================================
dotenv.config({
	path: "./config/config.env",
});

// ====================================
//        Main Methods & Statements
// ====================================

// This is the main method of connection called from the index.js file
// Through here, all the main connections and checks are ran
async function connectToDatabases() {
	// Connect to SQL Database
	connectSQL()
		.then(async () => {
			let groups = await CreateTableGroups();
			let users = await CreateTableUsers();
		})
		.catch((err) => {
			console.log(err);
		});
}

async function connectSQL() {
	// Setup event handler when the connection is established.
	let connection = await createConnection();
	return new Promise((resolve, reject) => {
		connection.connect(function (err) {
			if (err) reject(err);
			else resolve("connected");
		});
	});
}

// ====================================
//       	Table Creation
// ====================================

async function CreateTableUsers() {
	let connection = await createConnection();
	return new Promise(async (resolve, reject) => {
		// Hashing password
		let _password = await bcrypt
			.hash(process.env.ADMIN_PASSWORD, 10)
			.then((hash) => {
				return hash;
			})
			.catch((err) => {
				console.log(err);
			});
		// making the connection
		connection.connect((err) => {
			if (err) reject(err);
			// Statement setup
			let statement = `IF OBJECT_ID('Users') IS NULL
			BEGIN
				CREATE TABLE [dbo].[Users](
					id INT NOT NULL IDENTITY,
					[fullname] [nvarchar](100) NOT NULL,
					[username] [nvarchar](100) NOT NULL UNIQUE,
					[email] [nvarchar](MAX) NOT NULL,
					[password] [nvarchar](MAX) NULL,
					groupId INT,
					createdAt DATETIME NOT NULL DEFAULT GETDATE(),
					lastEdited DATETIME NULL
					CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
					(
						[id] ASC
					)
				);
				ALTER TABLE Users
				ADD CONSTRAINT FK_Users_Groups
				FOREIGN KEY (groupId)
				REFERENCES Groups(id);
				INSERT INTO Users
				(fullname, username, password, email, groupId)
				VALUES
				('System Admin','admin','${_password}','${process.env.ADMIN_EMAIL}', 1);
			END
			ELSE
			BEGIN
				PRINT 'Users Table exists.'
			END`;

			// Other
			// console.log(statement)

			// Request setup
			let request = new Request(statement, function (err, rowCount, rows) {
				if (err) {
					connection.close();
					console.log("The error happened create table: Users'. " + err);
					reject(err);
				} else {
				}
			});

			// Close the connection after the final event emitted by the request, after the callback passes
			request.on("requestCompleted", function () {
				connection.close();
				console.log("Users table created or already exists");
				resolve("Done");
			});
			connection.execSql(request);
		});
	});
}

async function CreateTableGroups() {
	let connection = await createConnection();
	return new Promise((resolve, reject) => {
		connection.connect((err) => {
			if (err) reject(err);
			// Statement setup
			let statement = `IF OBJECT_ID('Groups') IS NULL
			BEGIN
			CREATE TABLE [dbo].[Groups](
				id INT NOT NULL IDENTITY,
				[name] NVARCHAR(250) NOT NULL,
				email NVARCHAR(255) NULL,
				createdAt DATETIME NOT NULL DEFAULT GETDATE(), -- Defaults to the current date and time
    			isSystemAdmin BIT NOT NULL DEFAULT 0, -- Defaults to false (0)
    			lastEdited DATETIME NULL -- Allows NULL values
				CONSTRAINT [PK_Groups] PRIMARY KEY CLUSTERED 
				(
					[id] ASC
				)
			);
			INSERT INTO Groups
				(name, isSystemAdmin)
				VALUES
				('${process.env.MAIN_GROUP}',1);
			
			END
			ELSE
			BEGIN
				PRINT 'Groups Table exists.'
			END
			`;

			// Other
			// console.log(statement)

			// Request setup
			let request = new Request(statement, function (err, rowCount, rows) {
				if (err) {
					connection.close();
					console.log("The error happened create table: groups'. " + err);
					reject(err);
				} else {
				}
			});

			// Close the connection after the final event emitted by the request, after the callback passes
			request.on("requestCompleted", function () {
				connection.close();
				console.log("groups table created or already exists");
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
	connectToDatabases,
	// connection,
};
