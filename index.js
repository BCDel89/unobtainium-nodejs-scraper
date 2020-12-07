'use strict';
const requireFromUrl = require('require-from-url/sync');
const config = require('./config');

const apiUrl = config.production ? 'http://buddycdelaune.com/' : 'http://localhost:3000/';
const unobtainiumCrawlerUrl = apiUrl + 'public/unobtainiumCrawler.js';

(async () => {

	const start = async () => {
		try {
			console.log('Starting Web Scraping Process');
			const crawler = config.production ? requireFromUrl(unobtainiumCrawlerUrl) : require('../unobtainium-api/scripts/unobtainiumCrawler');
			console.log('Process started, scraping..');

			/**
			 * options = {
			 *   batchSize: {number} (how many products to check at a time default is 100)
			 * }
			 */
			// const options = {};
			const options = {batchSize: config.batchSize || 100, throttle: config.throttle || 0, country: 'US'};

			await crawler.startWithOptions(options);

			console.log('Process finished, restarting..');

			return start();

		} catch (e) {
			console.log('server status error: ', e);
			setTimeout(start, 3000);
		}
	};

	return setTimeout(start,3000);

})();
