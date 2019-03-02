const { Command } = require('discord-akairo');

class ClearCommand extends Command {
	constructor() {
		super('clear', {
			aliases: ['clear', 'c'],
			description: {
				content: 'Clears the queue'
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
		const DJ = message.client.settings.get(message.guild.id, 'djRole');
		const queue = this.client.music.queues.get(message.guild.id);
		if (DJ && !message.member.roles.has(DJ)) return message.channel.send(`Only **${message.guild.roles.get(DJ).name}** can do this.`);

		await queue.clear();
		return message.util.send('ok');
	}
}

module.exports = ClearCommand;
