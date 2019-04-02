/* eslint-disable valid-jsdoc */
const { Argument, Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const paginate = require('../../../util/paginate');
const timeString = require('../../../util/timeString');

class QueueCommand extends Command {
	constructor() {
		super('queue', {
			aliases: ['queue', 'nowplaying', 'np'],
			description: {
				content: 'Shows you the current queue.',
				usage: '[page]',
				examples: ['1', '3']
			},
			category: 'music',
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					'id': 'page',
					'match': 'content',
					'type': Argument.compose(string => string.replace(/\s/g, ''), Argument.range(Argument.union('number', 'emojint'), 1, Infinity)),
					'default': 1
				}
			]
		});
	}

	/**
	 *
	 * @param {import('discord.js').Message} message
	 */
	async exec(message, { page }) {
		/** @type {import('lavaqueue').Queue} */
		const queue = this.client.music.queues.get(message.guild.id);
		const current = await queue.current();
		const tracks = [(current || { track: null }).track].concat(await queue.tracks()).filter(track => track);
		if (!tracks.length) return message.util.send(`I guess **${message.guild.name}** have an empty queue, Start a new one!`);
		const decoded = await this.client.music.decode(tracks);
		const totalLength = decoded.reduce((prev, song) => prev + song.info.length, 0);
		const paginated = paginate(decoded.slice(1), page);
		let index = 10 * (paginated.page - 1);

		const embed = new MessageEmbed()
			.setAuthor(`${message.guild.name}'s Queue`, message.guild.iconURL())
			.setDescription(stripIndents`
				__**Now playing:**__
				
				**❯** [${decoded[0].info.title}](${decoded[0].info.uri}) (${timeString(current.position)}/${timeString(decoded[0].info.length)}) by \`${decoded[0].info.author}\`

				__**Queue:**__

				${paginated.items.length ? paginated.items.map(song => `**${++index}.** [${song.info.title}](${song.info.uri}) (${timeString(song.info.length)})`).join('\n') : 'No more songs in queue.'}

				**Total queue items:** ${decoded.length} | **Total queue time:** ${timeString(totalLength)}
			`)
			.addField('Repeat', this.client.settings.get(message.guild.id, 'repeat', 'off').toUpperCase(), true)
			.addField('Status', ['INSTANTIATED', 'PLAYING', 'PAUSED', 'ENDED', 'ERRORED', 'STUCK'][queue.player.status], true)
			.setColor('#7ec0ee');
		if (paginated.maxPage > 1) embed.setFooter(`Page ${page}/${paginated.maxPage}`, 'https://i.imgur.com/nFPDKdU.png');

		return message.util.send(embed);
	}
}

module.exports = QueueCommand;
