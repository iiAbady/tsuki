const { Command } = require('discord-akairo');

class ClearCommand extends Command {
	constructor() {
		super('clear', {
			aliases: ['clear', 'c'],
			description: {
				content: 'Clears the queue including the current track'
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
		if (DJ && !message.member.roles.has(DJ)) return message.channel.send(`Only **${message.guild.roles.get(DJ).name}** can do this.`);
		/** @type {import('lavaqueue').Queue} */
		const queue = this.client.music.queues.get(message.guild.id);

		await queue.trim(1, -1);
		return message.util.send('ok');
	}
}

module.exports = ClearCommand;
