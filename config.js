'use strict';

module.exports = new function() {

  this.production = false;

  // How many sites to attempt to process at once can be an integer between 1 - 1000
  this.batchSize = 25;

  // Time IN SECONDS to wait between batches
  this.throttle = 1;

  // Restrict sites to a specific location, options are: [false, "US", "CAN", "UK", "EUR", "AUS"]
  this.country = "US";

}();
