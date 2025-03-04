//? ==================================== 
//?             Requirements 
//? ==================================== 
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

//? Model
const { User } = require("../models/UserModel")


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
router.post("/login", async (req, res) => {
  	const { email, password } = req.body;

  	try {
		// Find a user with the provided username
		const user = await User.findOne({ email }).exec();

		if (user) {
			const isPasswordValid = await bcrypt.compare(password, user.password);

			let userData = user.toObject()
      		delete userData.password

			const users = await User.find({ manager: user._id }).exec();
			userData.isManager = users.length > 0

			if (isPasswordValid) {
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
  
				// Store the refresh token in an HTTP-only cookie
				res.cookie("refreshToken", refreshToken, {
					httpOnly: true,
					secure: true,
					sameSite: "strict"
				});
		
				// Send access token to the frontend
				res.status(200).json({ success: true, token: accessToken });
			} else {
				res.status(403).json({ success: false, passwordError: "Wrong password", });
			}

		} else {
			res.status(403).json({ success: false, usernameError: "Wrong username. User does not exist", });
		}
	} catch (error) {
		console.error("Error while authenticating:", error);
		res.status(500).json({ success: false, err: error });
	}
});

//? ====================================
//?               Export
//? ====================================
module.exports = router;
