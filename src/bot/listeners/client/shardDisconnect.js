const { Listener } = require('discord-akairo');

class shardDisconnectListener extends Listener {
	constructor() {
		super('shardDisconnected', {
			emitter: 'client',
			event: 'shardDisconnected',
			category: 'client'
		});
	}

	exec(event, id) {
		this.client.logger.warn(`[SHARD ${id} DISCONNECTED] Ugh...I'm sorry...but, a loss is a loss... (${event.code})`, event);
	}
}

module.exports = shardDisconnectListener;
