const { Command } = require('discord-akairo');

class RepeatCommand extends Command {
	constructor() {
		super('repeat', {
			aliases: ['repeat', 'loop', '🔁'],
			description: {
				content: 'Enables/Disables repeat mode.',
				usage: '<on/off>',
				examples: ['on', 'off']
			},
			category: 'music',
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'mode',
					type: ['on', 'off', 'queue']
				}
			]
		});
	}

	// eslint-disable-next-line valid-jsdoc
	/**
 *
 * @param {import('discord.js').Message} message
 */
	exec(message, { mode }) {
		if (!message.member.voice || !message.member.voice.channel) {
			return message.util.reply('Join a voice channel first, bitc*');
		}
		const DJ = message.client.settings.get(message.guild.id, 'djRole');
		/** @type {import('lavaqueue').Queue} */
		const queue = this.client.music.queues.get(message.guild.id);
		if (!queue.player.playing && !queue.player.paused) return message.channel.send(`Theres nothing playing to repeat...`);
		if (DJ && !message.member.roles.has(DJ)) return message.channel.send(`Only **${message.guild.roles.get(DJ).name}** can do this.`);

		if (!mode) return message.channel.send('Please specify the repeat mode. (**on**/**off**/**queue**)');
		if (mode === 'off') this.client.settings.delete(message.guild.id, 'repeat');

		this.client.settings.set(message.guild.id, 'repeat', mode);
		return message.channel.send(`🔁 Setted repeat mode to **${mode}**`);
	}
}

module.exports = RepeatCommand;
