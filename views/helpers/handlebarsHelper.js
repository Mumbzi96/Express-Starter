const handlebars = require('express-handlebars');
const moment = require('moment');

hbs = handlebars.create({
	defaultLayout: 'main',
	helpers: {
		isEqual: function (value, name) {
			if (value == name) {
				return true;
			} else {
				return false;
			}
		},
	},
});

module.exports = hbs;
