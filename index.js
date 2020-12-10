'use strict';
const requireFromUrl = require('require-from-url/sync');
const config = require('./config');

const env = process.env.NODE_ENV || 'production';
const shouldRequireFromServer = env === 'production';
const apiUrl = process.env.API_URL || 'https://unobtainium.app/';
const unobtainiumCrawlerUrl = apiUrl + 'public/unobtainiumCrawler.js';

let blackList = [];

(async () => {

	const start = async () => {
		try {
			console.log('Starting Web Scraping Process with configuration:', config);

			const crawler = shouldRequireFromServer ?
				requireFromUrl(unobtainiumCrawlerUrl) :
				require('../unobtainium-api/scripts/unobtainiumCrawler');

			console.log('Process started, scraping..');

			const options = {batchSize: config.batchSize || 25, throttle: config.throttle || 0};
			await crawler.init(env, apiUrl, blackList);
			await crawler.startWithOptions(options);

			console.log('Process finished, restarting..');

			return start();

		} catch (e) {
			console.log('server status error: ', e);
			setTimeout(start, 3000);
		}
	};

	return setTimeout(start, 3000);

})();
