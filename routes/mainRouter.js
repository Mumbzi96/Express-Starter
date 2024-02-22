// ====================================
//             Requirements
// ====================================
const express = require("express");
const mainRouter = express.Router();

//Encryption
const bcrypt = require("bcryptjs");

// MongoDB
const Group = require("../database/mongo/schemas/groups");
const User = require("../database/mongo/schemas/users");

//========================
//          Main
//========================

mainRouter.get("/", (req, res, next) => {
	if (req.session && req.session.isLoggedIn) res.redirect("/home");
	else res.redirect("/login");
});

// ====================================
//          	Login/out
// ====================================

mainRouter.get("/login", async (req, res, next) => {
	if (req.session && req.session.isLoggedIn) res.redirect("/home");
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

	// Find user in database
	let userDB = await User.findOne({ email: _email }).populate("group").exec();

	// Check password of username exists
	if (userDB) {
		bcrypt
			.compare(_password, userDB.password)
			.then(async (isCorrect) => {
				// Check password
				console.log("Password comparison result:", isCorrect);

				if (isCorrect) {
					console.log("correct");

					// Check if req.session exists before setting properties
					if (req.session) {
						req.session.isLoggedIn = true;
						req.session.user = userDB;
						console.log("Password is correct");
						res.json({ redirect: "home" });
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
