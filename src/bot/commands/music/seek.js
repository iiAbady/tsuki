const { Command } = require('discord-akairo');
const moment = require('moment');
require('moment-duration-format');

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
						const duration = this.stringTime(str);
						const queue = this.client.music.queues.get(msg.guild.id);
						const current = await queue.current();
						const decodedCurrent = await this.client.music.decode(current);
						if ((duration && duration < decodedCurrent.info.length) && decodedCurrent.info.isSeekable) return duration;
						return null;
					},
					prompt: {
						start: msg => `${msg.author}, Where should I seek to to?`,
						retry: msg => `${msg.author}, Please use a proper time format (Should be less than the current track duration & track should be seekable)`
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
		if (!time) return message.channel.send(`What should I seek to?`);
		/** @type {import('lavaqueue').Queue} */
		const queue = this.client.music.queues.get(message.guild.id);
		await queue.player.seek(time);
		return message.channel.send(`✂ ${moment.duration(this.stringTime(time)).format('m[mineuts ] s[seconds]')} of current track`);
	}
}

module.exports = SeekCommand;
