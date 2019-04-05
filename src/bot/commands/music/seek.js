const { Command } = require('discord-akairo');
const ms = require('@naval-base/ms');
const timeString = require('../../../util/timeString');

class SeekCommand extends Command {
	constructor() {
		super('seek', {
			aliases: ['seek', '✂'],
			description: {
				content: 'Seek the current track',
				usage: '<time>',
				examples: ['5m']
			},
			args: [
				{
					id: 'time',
					type: async (str, msg) => {
						if (!str) return null;
						const duration = ms(str);
						const { current: encoded } = await this.client.music.queues.get(msg.guild.id);
						const current = await this.client.music.decode(encoded);
						if (duration && duration < (current.info.length - encoded.position)) return duration;
						return null;
					},
					prompt: {
						start: msg => `${msg.author}, Where should I seek to to?`,
						retry: msg => `${msg.author}, Please use a proper time format (Should be less than the current track duration)`
					}
				}
			]
		});
	}

	// eslint-disable-next-line valid-jsdoc
	/**
     * @param {import('discord.js').Message} message - the message
     */
	async exec(message, { time }) {
		if (!time) return message.channel.send(`What should I seek to?`);
		/** @type {import('lavaqueue').Queue} */
		const queue = this.client.music.queues.get(message.guild.id);
		await queue.player.seek(time);
		return message.channel.send(`✂ ${timeString(time)} of current track`);
	}
}

module.exports = SeekCommand;
