/* eslint-disable valid-jsdoc */
const { Command, Argument } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const paginate = require('../../../../util/paginate');

class PlaylistInfoCommand extends Command {
	constructor() {
		super('playlist-all', {
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
					'type': Argument.compose((_, str) => str.replace(/\s/g, ''), Argument.range(Argument.union('number', 'emojint'), 1, Infinity)),
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
		const playlists = await this.client.db.models.playlists.findAll();
		if (!playlists.length) return message.util.send(`Looks like I don't have any of playlists.`);
		const paginated = paginate(playlists, page);
		let index = 10 * (paginated.page - 1);
		const embed = new MessageEmbed()
			.setAuthor(`Playlists`, this.client.user.displayAvatarURL())
			.setColor('BLUE')
			.setDescription(paginated.items.map(playlist => `**${++index}.** **${playlist.name}** by ${this.client.users.get(playlist.user) ? this.client.users.get(playlist.user).tag : "Couldn't fetch user."}`));
		return message.util.send(embed);
	}
}

module.exports = PlaylistInfoCommand;
