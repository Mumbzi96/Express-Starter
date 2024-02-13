// ====================================
//             Requirements
// ====================================
const express = require('express');
const usersRouter = express.Router();

//========================
//          Main
//========================

usersRouter.get('/', (req, res, next) => {
	const users = [
		{
			name: "John Doe",
			phone: "123-456-7890",
			email: "john@example.com",
			type: "admin"
		},
		{
			name: "Jane Smith",
			phone: "987-654-3210",
			email: "jane@example.com",
			type: "admin"
		},
		{
			name: "Alice Johnson",
			phone: "555-555-5555",
			email: "alice@example.com",
			type: "admin"
		},
	];
	res.render('main/home', {users});
})
//========================
//          Exports
//========================
module.exports = usersRouter;