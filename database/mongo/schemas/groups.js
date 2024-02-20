const { default: mongoose } = require("mongoose");

const groupSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		match: /^\S+@\S+\.\S+$/, // Basic email format validation
	},
	createdAt: {
		type: Date,
		required: true,
	},
	isSystemAdmin: {
		type: Boolean,
		default: false,
	},
	lastEdited: Date,
});

const Group = mongoose.model("Group", groupSchema);

//========================
//          Exports
//========================
module.exports = Group;
