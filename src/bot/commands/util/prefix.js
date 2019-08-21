const { Command, Argument } = require('discord-akairo');

class PrefixCommand extends Command {
	constructor() {
		super('prefix', {
			aliases: ['prefix'],
			description: {
				content: 'Displays the prefix of the bot.'
			},
			category: 'util',
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'newPrefix',
					type: Argument.compose('string', (_, string) => string ? string.toLowerCase() : '') // eslint-disable-line no-confusing-arrow
				}
			]
		});
	}

	// eslint-disable-next-line valid-jsdoc
	/**
 *
 * @param {import('discord.js').Message} message
 * @param {Object} args
 * @param {string} args.newPrefix
 */
	exec(message, { newPrefix }) {
		if (!message.member.hasPermission('MANAGE_GUILD') || !newPrefix) {
			return message.util.send(`The current prefix for this guild are: ${this.handler.prefix(message).join(' | ')}`);
		}
		if (newPrefix.length > 5) return message.channel.send(`Prefix should be between **1** and **5**`);

		const currentPrefix = message.client.settings.get(message.guild.id, 'prefix');
		if (currentPrefix === newPrefix) return message.channel.send(`Prefix for this guild is already \`${newPrefix}\``);

		message.client.settings.set(message.guild.id, 'prefix', newPrefix);
		return message.channel.send(`I've changed prefix for this guild to: \`${newPrefix}\``);
	}
}

module.exports = PrefixCommand;
