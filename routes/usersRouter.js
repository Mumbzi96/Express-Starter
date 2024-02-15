// ====================================
//             Requirements
// ====================================
const express = require('express');
const usersRouter = express.Router();

//========================
//          Main
//========================

usersRouter.get('/', (req, res, next) => {
	res.redirect('/test');
})
//========================
//          Exports
//========================
module.exports = usersRouter;