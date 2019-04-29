const { Command } = require('discord-akairo');
const { Util } = require('discord.js');

class PlaylistCreateCommand extends Command {
	constructor() {
		super('playlist-create', {
			category: 'music',
			description: {
				content: 'Creates a playlist.',
				usage: '<playlist> [info]'
			},
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'playlist',
					type: 'existingPlaylist',
					prompt: {
						start: message => `${message.author}, What playlist do you want to create?`,
						retry: (message, _, provided) => `${message.author}, a playlist with the name **${provided.phrase}** already exists.`
					}
				},
				{
					id: 'info',
					match: 'rest',
					type: 'string'
				}
			]
		});
	}

	async exec(message, { playlist, info }) {
		const pls = await this.client.db.models.playlists.create({
			user: message.author.id,
			guild: message.guild.id,
			name: playlist,
			description: info ? Util.cleanContent(info, message) : null
		});

		return message.util.reply(`${this.client.emojis.get('568555845923897355').toString()} A playlist with the name **${pls.name}** has been created!`);
	}
}

module.exports = PlaylistCreateCommand;
