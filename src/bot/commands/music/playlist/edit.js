const { Command } = require('discord-akairo');
const { Util } = require('discord.js');

class PlaylistEditCommand extends Command {
	constructor() {
		super('playlist-edit', {
			category: 'music',
			description: {
				content: 'Edits the description of a playlist.',
				usage: '<playlist> <info>'
			},
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'playlist',
					type: 'playlist',
					prompt: {
						start: message => `${message.author}, What playlists description do you want to edit?`,
						retry: (message, _, provided) => `${message.author}, a playlist with the name **${provided.phrase}** does not exist.`
					}
				},
				{
					id: 'info',
					match: 'rest',
					type: 'string',
					prompt: {
						start: message => `${message.author}, what should the new description be?`
					}
				}
			]
		});
	}

	async exec(message, { playlist, info }) {
		if (playlist.user !== message.author.id) return message.util.reply(`${this.client.emojis.get('531969546723000323').toString()} fk off bit**`);
		playlist.description = Util.cleanContent(info, message);
		await playlist.save();

		return message.util.reply(`${this.client.emojis.get('544263946979246129').toString()} Updated **${playlist.name}'s** description.`);
	}
}

module.exports = PlaylistEditCommand;
