# unobtainium-nodejs-scraper

Simple NodeJs Scraper that will help the Unobtainium Community stay up-to-date with the latest stock information for products.

## Requirements
[NodeJs - v14](https://nodejs.org/en/download/)

[NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Install

Clone the repo to your computer
```sh
git clone https://github.com/BCDel89/unobtainium-nodejs-scraper.git
```
cd into the project directory
```sh
cd unobtainium-nodejs-scraper
```
If using NVM synchronize node version
```sh
nvm use
```
Install the project's dependencies
```sh
npm install
```

## Usage Options
The following variables in the config.js can be configured before startup

```js
// How many sites to attempt to process at once can be an integer between 1 - 1000
this.batchSize = 25;

// Time IN SECONDS to wait between batches
this.throttle = 1;

// Restrict sites to a specific location, options are: [false, "US", "CAN", "UK", "EUR", "AUS"]
// **NOTE** Temporarily RESTRICTED to US while we get the other locations setup
this.country = "US";
```

## Usage
To run in the foreground
```sh
npm start
```

To run as a process
```sh
npm run start:process
```

To stop the process
```sh
npm run stop:process
```


MIT License. Copyright (c) 2020 Buddy C Delaune