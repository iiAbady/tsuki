const { Command } = require('discord-akairo');

class VolumeCommand extends Command {
	constructor() {
		super('volume', {
			aliases: ['volume', 'vol', '🔈'],
			description: {
				content: 'Change the volume of current player.',
				usage: '<number>',
				examples: ['2', '5']
			},
			category: 'music',
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'vol',
					match: 'phrase',
					type: 'integer'
				}
			]
		});
	}

	// eslint-disable-next-line valid-jsdoc
	/**
 *
 * @param {import('discord.js').Message} message
 */
	async exec(message, { vol }) {
		if (!message.member.voice || !message.member.voice.channel) {
			return message.util.reply('Join a voice channel first, bitc*');
		}
		if (!vol) return message.channel.send(`Current volume is \`${message.client.settings.get(message.guild.id, 'volume', '100')}\``);
		const DJ = message.client.settings.get(message.guild.id, 'djRole');
		/** @type {import('lavaqueue').Queue} */
		const queue = this.client.music.queues.get(message.guild.id);
		if (!queue.player.playing && !queue.player.paused) return message.channel.send(`Wait, do you want me to have a volume for empty queue? what an idiot.`);
		if (message.member.roles.has(DJ)) return message.channel.send(`Only **${message.guild.roles.get(DJ).name}** can do this.`);

		if (vol > 200) return message.channel.send('I\'am pretty sure you don\'t want to have your ears **bleeding**!');
		if (vol < 1) return message.channel.send('Should I leave instead?!');

		message.client.settings.set(message.guild.id, 'volume', vol);
		await queue.player.setVolume(vol);
		return message.channel.send(`Changed volume to **${vol}**, are you happy?`);
	}
}

module.exports = VolumeCommand;
