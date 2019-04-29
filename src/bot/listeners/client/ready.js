const { Listener } = require('discord-akairo');
const { ReferenceType } = require('rejects');

class ReadyListener extends Listener {
	constructor() {
		super('ready', {
			emitter: 'client',
			event: 'ready',
			category: 'client'
		});
	}

	async exec() {
		this.client.logger.info(`[READY] Hello, I am ${this.client.user.tag} (${this.client.user.id}), one of the first fast battleships of the Sakura Empire. I'm someone who prefers the fist to the sword. Nice to meet you.`);
		this.client.user.setActivity(`@${this.client.user.username} help 🎶`);

		const players = await this.client.storage.get('players', { type: ReferenceType.ARRAY });
		if (players) {
			for (const player of players) {
				if (player.channel_id) {
					/** @type {import('lavaqueue').Queue} */
					const queue = this.client.music.queues.get(player.guild_id);
					const vol = this.client.settings.get(player.guild_id, 'volume');
					if (vol) queue.player.setVolume(vol);
					await queue.player.join(player.channel_id);
				}
			}
			await this.client.music.queues.start();
		}
	}
}

module.exports = ReadyListener;
