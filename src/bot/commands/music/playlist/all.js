/* eslint-disable valid-jsdoc */
const { Command, Argument } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const paginate = require('../../../../util/paginate');

class PlaylistInfoCommand extends Command {
	constructor() {
		super('playlist-info', {
			category: 'music',
			description: {
				content: 'Displays all playlists in your guild.'
			},
			channel: 'guild',
			clientPermissions: ['EMBED_LINKS'],
			ratelimit: 2,
			args: [
				{
					'id': 'page',
					'type': Argument.compose(string => string.replace(/\s/g, ''), Argument.range(Argument.union('number', 'emojint'), 1, Infinity)),
					'default': 1,
					'match': 'content'
				}
			]
		});
	}

	/**
 *
 * @param {import('discord.js').Message} message
 */
	async exec(message, { page }) {
		const playlists = await this.client.db.models.playlists.findAll({ where: { guild: message.guild.id } });
		if (!playlists) return message.util.send(`Looks like there's no playlists on ${message.guild.name}`);
		const paginated = paginate(playlists, page);
		let index = 10 * (paginated.page - 1);
		const embed = new MessageEmbed()
			.setAuthor(`${message.guild.name}'s Playlists`, message.guild.iconURL())
			.setColor('BLUE')
			.setDescription(paginated.items.map(playlist => `**${++index}.** **${playlist.name}** by ${this.client.users.get(playlist.user) ? this.client.users.get(playlist.user).tag : "Couldn't fetch user."}`));
		return message.util.send(embed);
	}
}

module.exports = PlaylistInfoCommand;
