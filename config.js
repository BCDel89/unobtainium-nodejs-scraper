'use strict';
const fs = require('fs');
const env = require('dotenv');

try {
	const tmpEnv = env.parse((fs.readFileSync('.env') || '').toString());
	if (tmpEnv.NODE_ENV === 'dev') env.config();
} catch (e) { }



module.exports = new function () {
	// ----------------------------------------------------------------------
	// v v v v v v v v v v v v CONFIGURABLE OPTIONS v v v v v v v v v v v v v
	// ----------------------------------------------------------------------

	// How many sites to attempt to process at once can be an integer between 1 - 1000
	this.batchSize = 15;

	// Time IN SECONDS to wait between batches
	this.throttle = 2;

	// Restrict sites to a specific location, options are: [false, "US", "CAN", "UK", "EUR", "AUS"]
	this.country = "US";

	// ----------------------------------------------------------------------
	// ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ CONFIGURABLE OPTIONS ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
	// ----------------------------------------------------------------------
}();
