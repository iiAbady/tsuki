const { Command } = require('discord-akairo');
const timeString = require('../../../util/timeString');

class SeekCommand extends Command {
	constructor() {
		super('seek', {
			aliases: ['seek', '✂'],
			description: {
				content: 'Seek the current track',
				usage: '<time>',
				examples: ['2:33']
			},
			category: 'music',
			args: [
				{
					id: 'time',
					type: str => {
						if (!str) return null;
						const duration = this.stringTime(str);
						return isNaN(duration) ? null : duration;
					},
					prompt: {
						start: msg => `${msg.author}, Where should I seek to to?`,
						retry: msg => `${msg.author}, Please use a proper time format.`
					}
				}
			]
		});
	}

	stringTime(str) {
		const [mins = 0, secs = 0] = str.split(':');
		return (mins * 60 * 1000) + (secs * 1000);
	}

	// eslint-disable-next-line valid-jsdoc
	/**
     * @param {import('discord.js').Message} message - the message
     */
	async exec(message, { time }) {
		if (!time) return message.channel.send(`Where should I seek to?`);
		/** @type {import('lavaqueue').Queue} */
		const queue = this.client.music.queues.get(message.guild.id);
		const current = await queue.current() || null;
		if (!current) return message.channel.send(`There's is nothing playing to seek`);
		const decoded = await this.client.music.decode(current.track);
		if (time && time < decoded.length && decoded.isSeekable) {
			await queue.player.seek(time);
			return message.channel.send(`sought to ${timeString(time)} of the current track, happy bit**?`);
		}
		return message.channel.send(`I couldn't seek to ${timeString(time)}, sorry ${this.client.emojis.get('538757805562265611').toString()}`);
	}
}

module.exports = SeekCommand;
