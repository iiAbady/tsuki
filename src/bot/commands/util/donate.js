/* eslint-disable valid-jsdoc */
const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class DonateCommand extends Command {
	constructor() {
		super('donate', {
			aliases: ['donate'],
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
			.setColor('BLUE')
			.setDescription(`All money will goes to the host of this bot and none more, http://donate.abady.me`);
		return message.channel.send(embed);
	}
}


module.exports = DonateCommand;
