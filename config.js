'use strict';
const env = require('dotenv').config();

module.exports = new function() {
  this.env = process.env.NODE_ENV || 'production';

  // ----------------------------------------------------------------------
	// v v v v v v v v v v v v CONFIGURABLE OPTIONS v v v v v v v v v v v v v
  // ----------------------------------------------------------------------

  // How many sites to attempt to process at once can be an integer between 1 - 1000
  this.batchSize = 10;

  // Time IN SECONDS to wait between batches
  this.throttle = 2;

  // Restrict sites to a specific location, options are: [false, "US", "CAN", "UK", "EUR", "AUS"]
  this.country = "US";

  // ----------------------------------------------------------------------
  // ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ CONFIGURABLE OPTIONS ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
  // ----------------------------------------------------------------------
}();
