// ====================================
//             Requirements
// ====================================
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const Group = require("../schemas/groups");
const User = require("../schemas/users");

// ====================================
//             Configuration
// ====================================
dotenv.config({
	path: "./config/config.env",
});

//========================//
//          Main
//========================//
let checkUsers = async () => {
	// Counting Companies
	let numberOfUsers = await User.countDocuments();

	// Hashing password
	let _password = await bcrypt
		.hash(process.env.ADMIN_PASSWORD, 10)
		.then((hash) => {
			return hash;
		})
		.catch((err) => {
			console.log(err);
		});

	// If no users exist, this is a dummy one
	if (numberOfUsers == 0) {
		let systemAdminGroup = await Group.findOne({ isSystemAdmin: true });

		let user = new User({
			fullName: "System Administrator",
			username: "admin",
			group: systemAdminGroup,
			email: process.env.ADMIN_EMAIL || "something@someone.com",
			password: _password,
			createdAt: new Date(),
		});
		user.save();
	}
};

//========================//
//          Exports
//========================//
module.exports = { checkUsers };
