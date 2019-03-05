const { Listener } = require('discord-akairo');

class MissingPermissionListener extends Listener {
	constructor() {
		super('missingPermissions', {
			event: 'missingPermissions',
			emitter: 'commandHandler',
			category: 'commandHandler'
		});
	}

	exec(message, command, reason) {
		return message.channel.send(`:x: ${reason === 'clientPermissions' ? 'I' : 'You'} don't have enough permissions to do **${command.aliases[0]}**!`);
	}
}

module.exports = MissingPermissionListener;
