const { Command } = require('discord-akairo');

class SetDJRoleCommand extends Command {
	constructor() {
		super('set-dj', {
			aliases: ['set-dj', 'dj-role'],
			description: {
				content: 'Sets the DJ role many of the commands use for permission checking.',
				usage: '<role>',
				examples: ['dj @DJ', 'dj DJ']
			},
			category: 'util',
			channel: 'guild',
			userPermissions: ['MANAGE_GUILD'],
			ratelimit: 2,
			args: [
				{
					id: 'role',
					type: 'role',
					prompt: {
						modifyStart: message => `${message.author}, What should be the DJ Role?`,
						modifyRetry: message => `${message.author}, That's not a vaild role!`
					},
					match: 'content'
				}
			]
		});
	}

	exec(message, { role }) {
		this.client.settings.set(message.guild, 'djRole', role.id);
		return message.util.reply(`I've set the DJ role to **${role.name}**`);
	}
}

module.exports = SetDJRoleCommand;
