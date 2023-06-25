// ====================================
//             Requirements
// ====================================
const express = require("express");
const mainRouter = express.Router();

//========================
//          Main
//========================

mainRouter.get("/", (req, res, next) => {
	let toSend = {
		title: "JSON Data",
		message: "This is a message sent back as JSON",
		date: new Date(),
	};
	res.json(toSend);
});

//========================
//          Exports
//========================
module.exports = mainRouter;
