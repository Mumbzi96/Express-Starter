// ====================================
//             Requirements
// ====================================
const express = require('express');
const mainRouter = express.Router();

//========================
//          Main
//========================

mainRouter.get('/', (req, res, next) => {
	res.render('main/home');
});

//========================
//          Exports
//========================
module.exports = mainRouter;
