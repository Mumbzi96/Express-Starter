
//========================
//          Main
//========================
const { default: mongoose } = require("mongoose");
const Group = require("../schemas/groups");
const dotenv = require("dotenv");

// dotenv
dotenv.config({
	path: "../../config/config.env", // Specifies dotenv
});
console.log

//========================
//          Main
//========================

let checkGroups = async () => {
	// Counting Groups
    try {
        let numberOfGroups = await Group.countDocuments({});
        if (numberOfGroups == 0) {
            let group = new Group({
                name: process.env.MAIN_GROUP,
                createdAt: new Date(),
                isSystemAdmin: true,
            });
            group.save();
        }
    }
    catch(err) {
        console.log(err);
    }
	
};

//========================
//          Exports
//========================
module.exports = { checkGroups };
