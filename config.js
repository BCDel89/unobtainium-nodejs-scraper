'use strict';
const env = require('dotenv').config();

module.exports = new function() {
  this.production = process.env.NODE_ENV || true;

  // ----------------------------------------------------------------------
	// v v v v v v v v v v v v CONFIGURABLE OPTIONS v v v v v v v v v v v v v
  // ----------------------------------------------------------------------

  // How many sites to attempt to process at once can be an integer between 1 - 1000
  this.batchSize = 25;

  // Time IN SECONDS to wait between batches
  this.throttle = 1;

  // Restrict sites to a specific location, options are: [false, "US", "CAN", "UK", "EUR", "AUS"]
  this.country = "US";

  // ----------------------------------------------------------------------
  // ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ CONFIGURABLE OPTIONS ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
  // ----------------------------------------------------------------------
}();
