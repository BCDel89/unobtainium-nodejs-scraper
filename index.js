'use strict';
const requireFromUrl = require('require-from-url/sync');
const config = require('./config');

const env = process.env.NODE_ENV || 'production';
const shouldRequireFromServer = env === 'production';
const apiUrl = process.env.API_URL || 'https://unobtainium.app/';
const unobtainiumCrawlerUrl = apiUrl + 'public/unobtainiumCrawler.js';
const blackListResetCycleLimit = 250;

let blackList = [];
let cycles = 0;

(async () => {

	const start = async () => {
		try {
			cycles += 1;
			console.log('Starting Web Scraping Process with configuration:', config);
			console.log('Beginning cycle: ', cycles);
			if (cycles % 250 === 0) blackList = [];

			const resolves = require('require-from-url/resolves');
			Object.keys(resolves).forEach(k => delete resolves[k]);

			const crawler = shouldRequireFromServer ?
				requireFromUrl(unobtainiumCrawlerUrl) :
				require('../unobtainium-api/scripts/unobtainiumCrawler');
			// requireFromUrl(unobtainiumCrawlerUrl);

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
