const { default: mongoose, Schema } = require("mongoose");
const Group = require("./groups");

const userSchema = mongoose.Schema({
	fullName: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	group: {
		type: Schema.Types.ObjectId,
		ref: "Group",
	},
	createdAt: {
		type: Date,
		required: true,
		default: new Date(),
	},
	lastEdited: Date,
});

const User = mongoose.model("User", userSchema);

//========================
//          Exports
//========================
module.exports = User;
