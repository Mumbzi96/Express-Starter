// ====================================
//             Requirements
// ====================================
const express = require("express");
const usersRouter = express.Router();
const dotenv = require("dotenv");

// MongoDB
const Group = require("../database/mongo/schemas/groups");
const User = require("../database/mongo/schemas/users");

// MSSQL
const { getOne, getAll } = require("../database/sql/methods/jointMethods");

// ====================================
//             Configuration
// ====================================
dotenv.config({
	path: "./config/config.env",
});

//========================
//          Main
//========================

usersRouter.get("/", async (req, res, next) => {
	// navdata setup
	let navdata = { language: "English" };

	let users = [];

	// Get all users
	if (process.env.DATABASE.toLowerCase() == "mongo") {
		users = await User.find({}).populate("group").exec();
	} else if (process.env.DATABASE.toLowerCase() == "mssql") {
		getAll("users")
			.then((data) => {
				users = data;
			})
			.catch((err) => {
				next(err);
			});
	}

	res.render("main/users/list", { navdata,users });
});
//========================
//          Exports
//========================
module.exports = usersRouter;
