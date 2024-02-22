// ====================================
//             Requirements
// ====================================
const express = require("express");
const mainRouter = express.Router();
const dotenv = require("dotenv");
const session = require("express-session");

//Encryption
const bcrypt = require("bcryptjs");

// MongoDB
const Group = require("../database/mongo/schemas/groups");
const User = require("../database/mongo/schemas/users");

const { getOne } = require("../database/sql/methods/jointMethods");

// ====================================
//             Configuration
// ====================================
dotenv.config({
	path: "./config/config.env",
});

//========================
//          Main
//========================

mainRouter.get("/", (req, res, next) => {
	if (req.session && req.session.isLoggedIn) res.redirect("/users");
	else res.redirect("/login");
});

// ====================================
//          	Login/out
// ====================================

mainRouter.get("/login", async (req, res, next) => {
	if (req.session && req.session.isLoggedIn) res.redirect("/users");
	else {
		// navdata setup
		let navdata = { language: "English" };
		// Render
		res.render("main/login/login", {
			layout: "login",
			navdata,
		});
	}
});

mainRouter.post("/login", async (req, res, next) => {
	// Get data submitted from form
	let _email = req.body.email;
	let _password = req.body.password;

	// Find user based on database
	let userDB;
	if (process.env.DATABASE.toLowerCase() == "mongo")
		userDB = await User.findOne({ email: _email }).populate("group").exec();
	else if (process.env.DATABASE.toLowerCase() == "mssql") {
		userDB = await getOne("Users", "email", _email);
	}

	// Check password of username exists
	if (userDB) {
		bcrypt
			.compare(_password, userDB.password)
			.then(async (isCorrect) => {
				// Check password
				if (isCorrect) {
					// Check if req.session exists before setting properties
					if (req.session) {

						req.session.isLoggedIn = true;
						req.session.user = userDB;
						res.json({ redirect: "users" });
					} else {
						console.error("req.session is undefined");
					}
				} else {
					res.json({ passwordErrorMessage: "Password is incorrect" });
				}
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		// User does not exist
		res.json({ emailErrorMessage: "Email/User does not exist" });
	}
});

mainRouter.get("/logout", (req, res, next) => {
	req.session.destroy();
	res.redirect("/login");
});

//========================
//          Exports
//========================
module.exports = mainRouter;
