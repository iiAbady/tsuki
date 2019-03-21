const { Argument, Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const paginate = require('../../../../util/paginate');

class PlaylistListCommand extends Command {
	constructor() {
		super('playlist-list', {
			category: 'music',
			description: {
				content: 'Displays all playlists (from a specific user).',
				usage: '[member]'
			},
			channel: 'guild',
			clientPermissions: ['EMBED_LINKS'],
			ratelimit: 2,
			args: [
				{
					'id': 'member',
					'type': 'member',
					'default': message => message.member
				},
				{
					id: 'page',
					type: Argument.compose(string => string.replace(/\s/g, ''), Argument.range(Argument.union('number', 'emojint'), 1, Infinity))
				}
			]
		});
	}

	async exec(message, { member, page }) {
		const playlists = await this.client.db.models.playlists.findAll({ where: { user: member.id } });
		if (!playlists.length) return message.util.send(`${member ? `${member.displayName}` : `${message.guild.name}`} doesn't have any playlists.`);
		const paginated = paginate(playlists, page);

		const embed = new MessageEmbed()
			.setAuthor(`${member.user.tag} (${member.id})`, member.user.displayAvatarURL())
			.setDescription(stripIndents`
				__**Playlists:**__

				${paginated.items.map(playlist => `** • ** ${playlist.name}`).join('\n')}
			`);
		if (paginated.maxPage > 1) embed.setFooter(`Page ${page}/${paginated.maxPage}`, 'https://i.imgur.com/nFPDKdU.png');

		return message.util.send(embed);
	}
}

module.exports = PlaylistListCommand;
