const { Listener } = require('discord-akairo');
const { addBreadcrumb, Severity } = require('@sentry/node');

class CommandStartedListener extends Listener {
	constructor() {
		super('commandStarted', {
			emitter: 'commandHandler',
			event: 'commandStarted',
			category: 'commandHandler'
		});
	}

	exec(message, command, args) {
		addBreadcrumb({
			message: 'command_started',
			category: command.category.id,
			level: Severity.Info,
			data: {
				user: {
					id: message.author.id,
					username: message.author.tag
				},
				/* eslint-disable multiline-ternary */
				guild: message.guild ? {
					id: message.guild.id,
					name: message.guild.name
				} : null,
				command: {
					id: command.id,
					aliases: command.aliases,
					category: command.category.id
				},
				message: {
					id: message.id,
					content: message.content
				},
				args
			}
		});
	}
}

module.exports = CommandStartedListener;
