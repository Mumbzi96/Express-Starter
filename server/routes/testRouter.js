// ====================================
//             Requirements
// ====================================
const express = require('express');
const testRouter = express.Router();

//========================
//          Main
//========================

testRouter.get('/', (req, res, next) => {
	res.send('Test router here!');
});

//========================
//          Exports
//========================
module.exports = testRouter;