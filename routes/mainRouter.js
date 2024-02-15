// ====================================
//             Requirements
// ====================================
const express = require('express');
const mainRouter = express.Router();

//========================
//          Main
//========================

mainRouter.get('/', (req, res, next) => {
	res.redirect('/test');
});

//========================
//          Exports
//========================
module.exports = mainRouter;
