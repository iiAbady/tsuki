const { Listener } = require('discord-akairo');

class shardReconnect extends Listener {
	constructor() {
		super('shardReconnecting', {
			emitter: 'client',
			event: 'shardReconnecting',
			category: 'client'
		});
	}

	exec(id) {
		this.client.logger.info(`[SHARD ${id} RECONNECTING] Firepower--full force!!`);
	}
}

module.exports = shardReconnect;
