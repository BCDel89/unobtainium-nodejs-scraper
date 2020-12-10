const {exec} = require('pkg');
const glob = require('glob');
const util = require('util');
const fs = require('fs');

(async () => {
	process.env.NODE_ENV='build';
	await exec(['./index.js']);
	const buildFiles = await util.promisify(glob)('index-*');
	buildFiles.forEach(file => fs.renameSync(file, file.replace('index-', 'unobtainiumNodeJsScraper-')));
})();

