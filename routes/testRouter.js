// ====================================
//             Requirements
// ====================================
const express = require("express");
const testRouter = express.Router();


testRouter.get("/", (req, res, next) => {
	let navdata = { language: "English" };
	let users = [
		{
			_id: "1",
			name: "John Doe",
			profilePic: "/path/to/profilePic.jpg",
			phone: {
				dialCode: "+1",
				number: "1234567890",
			},
			email: "johndoe@example.com",
			type: "Administrator",
		},
		{
			_id: "2",
			name: "Jane Smith",
			// Assuming no profilePic provided, so the default avatar will be used.
			phone: {
				dialCode: "+44",
				number: "0987654321",
			},
			email: "janesmith@example.com",
			type: "User",
		},
		{
			_id: "3",
			name: "Ahmed Al-Farsi",
			profilePic: "/path/to/ahmedPic.jpg",
			phone: {
				dialCode: "+971",
				number: "123123123",
			},
			email: "ahmedalf@example.com",
			type: "Manager",
		},
	];
	res.render("main/test/test", {layout:"login", navdata, users });
});


//========================
//          Login
//========================

testRouter.get("/login", (req, res, next) => {
	let navdata = { language: "English" };
	res.render("main/test/login", {layout:"login", navdata });
});

//========================
//          Lists
//========================

testRouter.get("/cards", (req, res, next) => {
	let navdata = { language: "English" };
	let users = [
		{
			_id: "1",
			name: "John Doe",
			profilePic: "/path/to/profilePic.jpg",
			phone: {
				dialCode: "+1",
				number: "1234567890",
			},
			email: "johndoe@example.com",
			type: "Administrator",
		},
		{
			_id: "2",
			name: "Jane Smith",
			// Assuming no profilePic provided, so the default avatar will be used.
			phone: {
				dialCode: "+44",
				number: "0987654321",
			},
			email: "janesmith@example.com",
			type: "User",
		},
		{
			_id: "3",
			name: "Ahmed Al-Farsi",
			profilePic: "/path/to/ahmedPic.jpg",
			phone: {
				dialCode: "+971",
				number: "123123123",
			},
			email: "ahmedalf@example.com",
			type: "Manager",
		},
	];
	res.render("main/test/cardsList", { navdata, users });
});

//========================
//          Exports
//========================
module.exports = testRouter;
