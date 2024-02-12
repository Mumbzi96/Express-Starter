// ====================================
//             Requirements
// ====================================
const express = require('express');
const mainRouter = express.Router();

//========================
//          Main
//========================

mainRouter.get('/', (req, res, next) => {
	
});

mainRouter.get('/login', (req ,res ,next) => {
	res.render('layouts/login')
})

mainRouter.get('/signup', (req, res, next) => {
	res.render('layouts/signup')
})

//========================
//          Exports
//========================
module.exports = mainRouter;
