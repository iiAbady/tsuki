const { Command } = require('discord-akairo');

class StopCommand extends Command {
	constructor() {
		super('stop', {
			aliases: ['stop', '🛑'],
			description: {
				content: 'Stops the queue.'
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
		const DJ = message.member.roles.has(message.client.settings.get(message.guild, 'djRole'));
		const queue = this.client.music.queues.get(message.guild.id);
		if (DJ) await queue.stop();
		else await queue.player.pause();

		return message.util.send(`🛑 ${DJ ? 'Stopped' : 'Paused'} the queue.`);
	}
}

module.exports = StopCommand;
