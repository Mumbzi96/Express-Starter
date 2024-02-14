// ====================================
//             Requirements
// ====================================
const express = require("express");
const testRouter = express.Router();

//========================
//          Main
//========================

testRouter.get("/cards", (req, res, next) => {
	let navdata = { language: "English" };
	res.render("main/test/test", { navdata });
});

//========================
//          Exports
//========================
module.exports = testRouter;
