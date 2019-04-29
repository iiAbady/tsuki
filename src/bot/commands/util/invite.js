/* eslint-disable valid-jsdoc */
const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class InviteCommand extends Command {
	constructor() {
		super('invite', {
			aliases: ['invite', 'inv'],
			category: 'util',
			ratelimit: 2
		});
	}

	/**
     *
     * @param {import('discord.js').Message} message
     */
	exec(message) {
		const embed = new MessageEmbed()
			.setColor('FFFF00')
			.setDescription(`I'd love to! [Invite me](https://discordapp.com/oauth2/authorize?client_id=535465700433723413&scope=bot&permissions=37014848)`);
		return message.channel.send(embed);
	}
}


module.exports = InviteCommand;
