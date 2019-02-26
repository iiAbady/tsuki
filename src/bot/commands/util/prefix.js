const { Command } = require('discord-akairo');

class PrefixCommand extends Command {
	constructor() {
		super('prefix', {
			aliases: ['prefix'],
			description: {
				content: 'Displays the prefix of the bot.'
			},
			category: 'util',
			channel: 'guild',
			ratelimit: 2
		});
	}

	exec(message) {
		return message.util.send(`The current prefix for this guild are: ${this.handler.prefix(message).join(' | ')}`);
	}
}

module.exports = PrefixCommand;
