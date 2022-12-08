// ====================================
//             Requirements
// ====================================
const express = require('express');
const testRouter = express.Router();

//========================//
//          Main
//========================//

testRouter.get('/', (req, res, next) => {
	res.render('main/test/test');
});

//========================//
//          Exports
//========================//
module.exports = testRouter;
console.log("test npm i")