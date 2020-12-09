'use strict';
const requireFromUrl = require('require-from-url/sync');
const config = require('./config');

const isProduction = config.env === 'production';
const apiUrl = isProduction ? 'https://unobtainium.app/' : 'http://localhost:3009/';
const unobtainiumCrawlerUrl = apiUrl + 'public/unobtainiumCrawler.js';
let blackList = [];

(async () => {

	const start = async () => {
		try {
			console.log('Starting Web Scraping Process');
			const crawler = isProduction ? requireFromUrl(unobtainiumCrawlerUrl) : require('../unobtainium-api/scripts/unobtainiumCrawler');

			console.log('Process started, scraping..');

			const options = {batchSize: config.batchSize || 100, throttle: config.throttle || 0, country: 'US'};
			await crawler.init(config.env, apiUrl, blackList);
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
