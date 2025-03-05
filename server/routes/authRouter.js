//? ==================================== 
//?             Requirements 
//? ==================================== 
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const { validationResult } = require("express-validator");

//? Model
const { User } = require("../models/UserModel");

//? Validations
const { loginValidation } = require('../validations/authValidation');


//? ==================================== 
//?            Helper Functions
//? ==================================== 
function validateRefreshToken(refreshToken) {
	try {
		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		return decoded;
	} catch (err) {
		console.error('Invalid refresh token:', err);
		return null;
	}
}

//? ==================================== 
//?                Get
//? ==================================== 
router.get('/load-user', async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({ token: null });
		}

		// Validate refresh token
		const decoded = validateRefreshToken(refreshToken);

		if (!decoded) {
			return res.status(401).json({ token: null });
		}

		// Generate new access token
		const newAccessToken = jwt.sign(
			{ user: decoded.user },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '15m' }
		);

		return res.json({ token: newAccessToken });
	} catch (error) {
		console.error('Error in /load-user:', error);
		return res.status(500).json({ token: null });
	}
});

router.get("/logout", (req, res) => {
	res.clearCookie("refreshToken", { httpOnly: true, expires: new Date(0) });

	res.status(200).json({
		success: true,
		message: "Logout successful!",
	});
});

//? ==================================== 
//?                Post
//? ==================================== 
router.post("/login", loginValidation, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ success: false, errors: errors.array() });
	}

	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email }).exec();
		if (!user) {
			return res.status(403).json({ success: false, message: "User does not exist" });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(403).json({ success: false, message: "Wrong password" });
		}

		let userData = user.toObject();
		delete userData.password;

		const managedUsers = await User.find({ manager: user._id }).exec();
		userData.isManager = managedUsers.length > 0;

		const accessToken = jwt.sign(
			{ user: userData },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "15m" }
		);

		const refreshToken = jwt.sign(
			{ user: userData },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: "30d" }
		);

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
		});

		res.status(200).json({ success: true, token: accessToken });
	} catch (error) {
		console.error("Error while authenticating:", error);
		res.status(500).json({ success: false, error: "Internal Server Error" });
	}
});

//? ====================================
//?               Export
//? ====================================
module.exports = router;
