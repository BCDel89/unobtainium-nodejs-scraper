'use strict';
const requireFromUrl = require('require-from-url/sync');

let blackList = [];
let cycles = 0;

const requireUncached = (module) => {
	delete require.cache[require.resolve(module)];
	return require(module);
};

(async () => {

	const start = async () => {
		try {

			const config = requireUncached('./config');
			const env = process.env.NODE_ENV || 'production';
			const shouldRequireFromServer = env === 'production';
			const apiUrl = process.env.API_URL || 'https://unobtainium.app/';
			const unobtainiumCrawlerUrl = apiUrl + 'public/unobtainiumCrawler.js';
			const resolves = require('require-from-url/resolves');
			Object.keys(resolves).forEach(k => delete resolves[k]);

			const crawler = shouldRequireFromServer ?
				requireFromUrl(unobtainiumCrawlerUrl) :
				require('../unobtainium-api/scripts/unobtainiumCrawler');
			// requireFromUrl(unobtainiumCrawlerUrl);

			cycles += 1;
			console.log('Starting Web Scraping Process with configuration:', config);
			console.log('Beginning cycle: ', cycles);

			const options = {batchSize: config.batchSize || 25, throttle: config.throttle || 0};
			blackList = await crawler.init(env, apiUrl, blackList);
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
