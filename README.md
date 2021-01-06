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
### To run in the foreground
```sh
npm start
```

### To run as a process (Cross platform suing `pm2`)
`pm2` will automatically handle start/stop but you have to manually start/stop `pm2`
#### Start
```sh
npm run start:process
```

#### Stop
```sh
npm run stop:process
```

#### Logs
Use `npx pm2 logs unobtainium-nodejs-scraper` to find location (Usually in `/home/$USER/.pm2/logs/unobtainium-nodejs-scraper-out.log`)

### To run as a process (Any linux with `systemd`)
`systemd` will automatically start/stop with computer itself and auto restart on crash

#### Setup
Create a file in `/etc/systemd/system/` (you can name it anything as long as extension is `.service`). Keep in mind file name for later
```sh
[Unit]
Description=Stock Bot
After=network-online.target

[Service]
Type=simple
WorkingDirectory=/unobtainium-nodejs-scraper/
ExecStart=/usr/bin/node index.js
User=stockbot
Group=stockbot
RemainAfterExit=no
Restart=always

[Install]
WantedBy=multi-user.target
```
Replace `/unobtainium-nodejs-scraper/` with the path of where this is saved
Replace `/usr/bin/node` (Default for all debian based linux) with the path of nodejs (Use `whereis node` to find that out)
Set `User` and `Group` to the user (and their group) that this service will run as (remember the principle of least privilege)

Once file is created have systemd recognize it: `systemctl daemon-reload`

#### Follow system actions (startup/shutdown)
`systemctl enable stockbot.service`

#### Start
`systemctl start stockbot.service`

#### Stop
`systemctl stop stockbot.service`

#### Logging
Live logs: `journalctl -fu stockbot.service`

One time log: `journalctl -u stockbot.service`

MIT License. Copyright (c) 2020 Buddy C Delaune
