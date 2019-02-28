const { Command } = require('discord-akairo');

class ResumeCommand extends Command {
	constructor() {
		super('resume', {
			aliases: ['resume'],
			description: {
				content: 'Resumes the queue.'
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
		const queue = this.client.music.queues.get(message.guild.id);
		await queue.player.pause(false);

		return message.util.send('Resumed the queue.');
	}
}

module.exports = ResumeCommand;
