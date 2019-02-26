const { Command } = require('discord-akairo');
const { stripIndents } = require('common-tags');

const RESPONSES = stripIndents`
        :ping_pong: Pong! \`$(ping)ms\`
		Heartbeat: \`$(heartbeat)ms\``;

class PingCommand extends Command {
	constructor() {
		super('ping', {
			aliases: ['ping'],
			description: {
				content: 'Shows the bot ping.'
			},
			category: 'util',
			ratelimit: 2
		});
	}

	async exec(message) {
		const msg = await message.util.send('Pinging...');

		return message.util.send(
			RESPONSES[Math.floor(Math.random() * RESPONSES.length)]
				.replace('$(ping)', Math.round(msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp))
				.replace('$(heartbeat)', Math.round(this.client.ws.ping))
		);
	}
}

module.exports = PingCommand;
