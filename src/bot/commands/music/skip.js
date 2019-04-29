const { Argument, Command } = require('discord-akairo');
const { stripIndents } = require('common-tags');
const { MessageEmbed } = require('discord.js');
const paginate = require('../../../util/paginate');
const timeString = require('../../../util/timeString');

class SkipCommand extends Command {
	constructor() {
		super('skip', {
			aliases: ['skip'],
			description: {
				content: 'Skips the amount of songs you specify (1 if you don\'t)',
				usage: '[number]',
				examples: ['3', '1']
			},
			category: 'music',
			channel: 'guild',
			ratelimit: 2
		});
	}

	*args() {
		const number = yield {
			match: 'rest', type: Argument.compose((_, str) => str.replace(/\s/g, ''), Argument.range(Argument.union('number', 'emojint'), 1, Infinity))
		};
		return { number };
	}

	async exec(message, { number }) {
		if (!message.member.voice || !message.member.voice.channel) {
			return message.util.reply('Join a voice channel first, bitc*');
		}
		/** @type {import('lavaqueue').Queue} */
		const queue = this.client.music.queues.get(message.guild.id);
		if (!queue.player.playing) return message.util.send(`There's nothing I can skip.`);
		let tracks;
		if (number > 1) {
			tracks = await this.client.music.queues.redis.lrange(`playlists.${message.guild.id}`, 0, number - 2);
		}
		const current = await queue.current();
		tracks = [(current || { track: null }).track].concat(tracks).filter(track => track);
		const skip = await queue.next(number);
		if (!skip) {
			await queue.stop();
			return message.util.send('Skipped the last playing song.');
		}
		const decoded = await this.client.music.decode(tracks);
		const totalLength = decoded.reduce((prev, song) => prev + song.info.length, 0);
		const paginated = paginate(decoded, 1, 10);
		let index = (paginated.page - 1) * 10;
		const embed = new MessageEmbed()
			.setDescription(stripIndents`
		**Skipped songs:**

		${paginated.items.map(song => `**${++index}.** [${song.info.title}](${song.info.uri}) (${timeString(song.info.length)})`).join('\n')}

		**Total skipped time:** ${timeString(totalLength)}
	`).setColor('ORANGE')
	 .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.avatarURL());

		return message.util.send(embed);
	}
}

module.exports = SkipCommand;
