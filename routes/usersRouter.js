// ====================================
//             Requirements
// ====================================
const express = require("express");
const usersRouter = express.Router();

//========================
//          Main
//========================

usersRouter.get("/", (req, res, next) => {
	// navdata setup
	let navdata = { language: "English" };
	res.render("main/users/list", { navdata });
});
//========================
//          Exports
//========================
module.exports = usersRouter;
