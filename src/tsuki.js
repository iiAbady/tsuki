require('dotenv').config();
const TsukiClient = require('./bot/client/TsukiClient');

const client = new TsukiClient({ owner: process.env.OWNERS, token: process.env.TOKEN });

client
	.on('error', err => client.logger.error(`[CLIENT ERROR] ${err.message}`, err.stack))
	.on('shardError', (err, id) => client.logger.error(`[SHARD ${id} ERROR] ${err.message ? err.message : err}`, err.stack))
	.on('warn', warn => client.logger.warn(`[CLIENT WARN] ${warn}`));

client.start();
