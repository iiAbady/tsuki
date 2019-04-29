const { Listener } = require('discord-akairo');
const Raven = require('raven');

const RESPONSES = [
	`W-What?!?! That was unexpected. (Error: !{err})`,
	`Alrrightt! I'am going to fix this asap. (Error: !{err})`,
	`Thank's for finding this bug for me, I'am going to slay it. (Error: !{err})`
];

class CommandErrorListener extends Listener {
	constructor() {
		super('error', {
			emitter: 'commandHandler',
			event: 'error',
			category: 'commandHandler'
		});
	}

	exec(error, message, command) {
		this.client.logger.error(`[COMMAND ERROR] ${error.message}`, error.stack);
		Raven.captureBreadcrumb({
			message: 'command_errored',
			category: command ? command.category.id : 'inhibitor',
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
				command: command ? {
					id: command.id,
					aliases: command.aliases,
					category: command.category.id
				} : null,
				message: {
					id: message.id,
					content: message.content
				}
				/* eslint-enable multiline-ternary */
			}
		});
		Raven.captureException(error);
		return message.util.send(
			RESPONSES[Math.floor(Math.random() * RESPONSES.length)]
				.replace('!{err}', `${command.id}${error.message.length + command.id.length}`)
		);
	}
}

module.exports = CommandErrorListener;
