/* eslint-disable valid-jsdoc */
const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { Op } = require('sequelize');

class PlaylistInfoCommand extends Command {
	constructor() {
		super('playlist-search', {
			category: 'music',
			description: {
				content: 'Searches a playlist.',
				usage: '<name>'
			},
			channel: 'guild',
			clientPermissions: ['EMBED_LINKS'],
			ratelimit: 2,
			args: [
				{
					'id': 'name',
					'type': 'lowercase',
					'default': 1,
					'match': 'content',
					'prompt': {
						start: message => `${message.author}, What would you like to search for?`
					}
				}
			]
		});
	}

	/**
 *
 * @param {import('discord.js').Message} message
 */
	async exec(message, { name }) {
		const playlists = await this.client.db.models.playlists.findAll({ where: { name: { [Op.like]: `%${name}%` } } });
		if (!playlists.length) return message.reply(`No results found with query ${name}.`);
		const search = playlists.map(playlist => `\`${playlist.name}\``).sort().join(', ');
		if (search.length >= 1950) {
			return message.reply('the output is way too big to display, make your search more specific and try again!');
		}
		const embed = new MessageEmbed()
			.setColor(0x30a9ed)
			.setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL)
			.setDescription(search);

		return message.util.send(embed);
	}
}

module.exports = PlaylistInfoCommand;
