const { Listener } = require('discord-akairo');

class shardResume extends Listener {
	constructor() {
		super('shardResumed', {
			emitter: 'client',
			event: 'shardResumed',
			category: 'client'
		});
	}

	exec(id) {
		this.client.logger.info(`[SHARD ${id} RESUMED] Alright, next time I'll--Eh...again...?`);
	}
}

module.exports = shardResume;
