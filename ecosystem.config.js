'use strict';

module.exports = {
  apps: [
    {
      name: 'unobtainium-nodejs-scraper',
      script: 'index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      // eslint-disable-next-line camelcase
      max_memory_restart: '1G',
      env_dev: {
        NODE_ENV: 'dev',
      },
      // eslint-disable-next-line camelcase
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
