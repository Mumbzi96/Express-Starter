const handlebars = require("express-handlebars");
const moment = require("moment");

hbs = handlebars.create({
	defaultLayout: "main",
	runtimeOptions: {
		allowProtoPropertiesByDefault: true,
		allowProtoMethodsByDefault: true,
	},
	helpers: {
		isEqual: function (value, name) {
			if (value == name) {
				return true;
			} else {
				return false;
			}
		},
		isEmptyArray: function (arr) {
			if (arr && arr.length > 0) return false;
			else return true;
		},
	},
});

module.exports = hbs;
