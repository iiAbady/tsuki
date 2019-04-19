const { Command } = require('discord-akairo');

class PlaylistDeleteCommand extends Command {
	constructor() {
		super('playlist-delete', {
			category: 'music',
			description: {
				content: 'Deletes a playlist.',
				usage: '<playlist>'
			},
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'playlist',
					match: 'content',
					type: 'playlist',
					prompt: {
						start: message => `${message.author}, What playlist do you want to delete?`,
						retry: (message, _, provided) => `${message.author}, a playlist with the name **${provided.phrase}** does not exist.`
					}
				}
			]
		});
	}

	exec(message, { playlist }) {
		if (playlist.user !== message.author.id) return message.util.reply(`👮 sorry sir that's not allowed`);
		playlist.destroy();

		return message.util.reply(`${this.client.emojis.get('568555845923897355').toString()} Deleted **${playlist.name}**.`);
	}
}

module.exports = PlaylistDeleteCommand;
