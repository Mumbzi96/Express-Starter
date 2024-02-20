// ====================================
//             Main Helpers
// ====================================

// Receives an object and a statement and adds the properties of that object to that statement
function addObjectPropertiesToStatement(obj, statement) {
	for (property in obj) {
		if (obj[property] && obj[property].length != 0) {
			statement += property + ",";
		}
	}
	statement = statement.slice(0, statement.length - 1);
	statement += ") VALUES(";

	return statement;
}

// takes an object and a statement and adds the values to the statement
function fillValuesIntoStatement(obj, statement) {
	let newObj = {};

	for (property in obj) {
		if (obj[property] && obj[property].length != 0) {
			newObj[property] = obj[property];
		}
	}

	// Adding values to the statement
	for (property in newObj) {
		// If property is object, date or other
		if (typeof newObj[property] == "object") {
			let x = "";
			// If object is a date
			if (
				Object.prototype.toString.call(newObj[property]) === "[object Date]"
			) {
				x = newObj[property].toISOString().slice(0, 19).replace("T", " ");
			}
			// Other objects
			else {
				x = JSON.stringify(newObj[property]);
				if (x.charAt(x.length - 1) == ",") x = x.slice(0, x.length - 1);
			}
			statement += "N'" + x + "'" + ",";
			// If propert is string or checkbox
		} else if (typeof newObj[property] == "string") {
			if (newObj[property] == "on") {
				newObj[property] = true;
				statement += 1 + ",";
			} else if (newObj[property] == parseInt(newObj[property]))
				statement += parseInt(newObj[property]) + ",";
			else statement += "N'" + newObj[property] + "'" + ",";
		} else {
			statement += `${newObj[property]},`;
		}
	}
	statement = statement.slice(0, statement.length - 1);
	statement += `);`;
	return statement;
}

//========================
//          Exports
//========================

module.exports = {
	addObjectPropertiesToStatement,
	fillValuesIntoStatement,
};
