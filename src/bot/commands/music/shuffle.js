const { Command } = require('discord-akairo');

class ShuffleCommand extends Command {
	constructor() {
		super('shuffle', {
			aliases: ['shuffle', '🔀'],
			description: {
				content: 'Shuffles the queue.'
			},
			category: 'music',
			channel: 'guild',
			ratelimit: 2
		});
	}

	async exec(message) {
		if (!message.member.voice || !message.member.voice.channel) {
			return message.util.reply('Join a voice channel first, bitc*');
		}
		/** @type {import('lavaqueue').Queue} */
		const queue = this.client.music.queues.get(message.guild.id);
		const length = await queue.length() || 0;

		if (!length || length < 5) return message.channel.send(`There should be at least 5 tracks in queue to shuffle.`);

		await queue.shuffle();

		return message.util.send('🔀 Shuffled the queue.');
	}
}

module.exports = ShuffleCommand;
