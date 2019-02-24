require('dotenv').config();
const TsukiClient = require('./bot/client/TsukiClient');

const client = new TsukiClient({ owner: process.env.OWNERS, token: process.env.TOKEN });

client
	.on('error', err => client.logger.error(`Error:\n${err.stack}`))
	.on('warn', warn => client.logger.warn(`Warning:\n${warn}`));

client.start();
