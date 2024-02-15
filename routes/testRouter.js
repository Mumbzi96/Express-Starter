// ====================================
//             Requirements
// ====================================
const express = require("express");
const testRouter = express.Router();

//========================
//          Main
//========================

testRouter.get("/", (req, res, next) => {
	let navdata = { language: "English" };
	let researches = [
		{
			_id: "1",
			initialStatus: "pending",
			inProcessStatus: "declined",
			payment: {
				type: "Quantitative",
				trackSpeed: "Fast Track"
			},
			title: "The Impact of Global Warming",
			userID: {
				username: "researcher1"
			},
			committee: [
				{
					committeeID: {
						username: "committeeMember1"
					}
				},
				{
					committeeID: {
						username: "committeeMember2"
					}
				}
			],
			comments: [
				{
					committeeID: {
						fullName: "Dr. Smith"
					},
					reason: "More detailed analysis required in section 4."
				}
			],
			assistant: {
				checkedResearch: true,
				assistantCode: {
					username: "assistantAdmin1"
				}
			}
		},
		{
			_id: "2",
			initialStatus: "approved",
			inProcessStatus: "in progress",
			payment: {
				type: "Qualitative",
				trackSpeed: "Standard"
			},
			title: "Social Media and Mental Health",
			userID: {
				username: "researcher2"
			},
			committee: [
				{
					committeeID: {
						username: "committeeMember3"
					}
				}
			],
			comments: [
				{
					committeeID: {
						fullName: "Professor Johnson"
					},
					reason: "Consider expanding the survey demographic."
				}
			],
			assistant: {
				checkedResearch: false,
				assistantCode: {
					username: "assistantAdmin2"
				}
			}
		},
		{
			_id: "3",
			initialStatus: "completed",
			inProcessStatus: "approved",
			payment: {
				type: "Mixed Methods",
				trackSpeed: "Fast Track"
			},
			title: "Innovations in Renewable Energy",
			userID: {
				username: "researcher3"
			},
			committee: [
				{
					committeeID: {
						username: "committeeMember4"
					}
				},
				{
					committeeID: {
						username: "committeeMember5"
					}
				},
				{
					committeeID: {
						username: "committeeMember6"
					}
				}
			],
			comments: [
				{
					committeeID: {
						fullName: "Dr. Emily"
					},
					reason: "Outstanding research work. Consider publishing in a high-impact journal."
				}
			],
			assistant: {
				checkedResearch: true,
				assistantCode: {
					username: "assistantAdmin3"
				}
			}
		}
	];
	res.render("main/test/tableList", { navdata, researches, message:'hello darkness my old friend' });
});

//========================
//          Signup
//========================

testRouter.get("/signup", (req, res, next) => {
	let navdata = { language: "English" };
	
	res.render("main/test/empty", {layout:"signup", navdata });
});

//========================
//          Login
//========================

testRouter.get("/login", (req, res, next) => {
	let navdata = { language: "English" };
	res.render("main/test/empty", {layout:"login", navdata });
});

//========================
//          Lists
//========================

testRouter.get("/cards", (req, res, next) => {
	let navdata = { language: "English" };
	let users = [
		{
			_id: "1",
			name: "John Doe",
			profilePic: "/path/to/profilePic.jpg",
			phone: {
				dialCode: "+1",
				number: "1234567890",
			},
			email: "johndoe@example.com",
			type: "Administrator",
		},
		{
			_id: "2",
			name: "Jane Smith",
			// Assuming no profilePic provided, so the default avatar will be used.
			phone: {
				dialCode: "+44",
				number: "0987654321",
			},
			email: "janesmith@example.com",
			type: "User",
		},
		{
			_id: "3",
			name: "Ahmed Al-Farsi",
			profilePic: "/path/to/ahmedPic.jpg",
			phone: {
				dialCode: "+971",
				number: "123123123",
			},
			email: "ahmedalf@example.com",
			type: "Manager",
		},
	];
	res.render("main/test/cardsList", { navdata, users });
});

testRouter.get("/table", (req, res, next) => {
	let navdata = { language: "English" };
	let researches = [
		{
			_id: "1",
			initialStatus: "pending",
			inProcessStatus: "declined",
			payment: {
				type: "Quantitative",
				trackSpeed: "Fast Track"
			},
			title: "The Impact of Global Warming",
			userID: {
				username: "researcher1"
			},
			committee: [
				{
					committeeID: {
						username: "committeeMember1"
					}
				},
				{
					committeeID: {
						username: "committeeMember2"
					}
				}
			],
			comments: [
				{
					committeeID: {
						fullName: "Dr. Smith"
					},
					reason: "More detailed analysis required in section 4."
				}
			],
			assistant: {
				checkedResearch: true,
				assistantCode: {
					username: "assistantAdmin1"
				}
			}
		},
		{
			_id: "2",
			initialStatus: "approved",
			inProcessStatus: "in progress",
			payment: {
				type: "Qualitative",
				trackSpeed: "Standard"
			},
			title: "Social Media and Mental Health",
			userID: {
				username: "researcher2"
			},
			committee: [
				{
					committeeID: {
						username: "committeeMember3"
					}
				}
			],
			comments: [
				{
					committeeID: {
						fullName: "Professor Johnson"
					},
					reason: "Consider expanding the survey demographic."
				}
			],
			assistant: {
				checkedResearch: false,
				assistantCode: {
					username: "assistantAdmin2"
				}
			}
		},
		{
			_id: "3",
			initialStatus: "completed",
			inProcessStatus: "approved",
			payment: {
				type: "Mixed Methods",
				trackSpeed: "Fast Track"
			},
			title: "Innovations in Renewable Energy",
			userID: {
				username: "researcher3"
			},
			committee: [
				{
					committeeID: {
						username: "committeeMember4"
					}
				},
				{
					committeeID: {
						username: "committeeMember5"
					}
				},
				{
					committeeID: {
						username: "committeeMember6"
					}
				}
			],
			comments: [
				{
					committeeID: {
						fullName: "Dr. Emily"
					},
					reason: "Outstanding research work. Consider publishing in a high-impact journal."
				}
			],
			assistant: {
				checkedResearch: true,
				assistantCode: {
					username: "assistantAdmin3"
				}
			}
		}
	];
	res.render("main/test/tableList", { navdata, researches, message:'hello darkness my old friend' });
});
//========================
//          Exports
//========================
module.exports = testRouter;
