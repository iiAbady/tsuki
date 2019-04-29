const { Argument, Command } = require('discord-akairo');
const url = require('url');
const path = require('path');

class PlayCommand extends Command {
	constructor() {
		super('play', {
			aliases: ['play', 'p', 'add', '📥', '➕'],
			description: {
				content: 'Play a song from literally any source you can think of.',
				usage: '<link/search>',
				examples: ['justin bieber']
			},
			category: 'music',
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'unshift',
					match: 'flag',
					flag: ['--start', '-s']
				},
				{
					'id': 'query',
					'match': 'rest',
					// eslint-disable-next-line no-confusing-arrow
					'type': Argument.compose('string', (_, str) => str ? str.replace(/<(.+)>/g, '$1') : ''),
					'default': ''
				}
			]
		});
	}

	// eslint-disable-next-line valid-jsdoc
	/**
 *
 * @param {import('discord.js').Message} message -  essag
 */
	async exec(message, { query, unshift }) {
		if (!message.member.voice || !message.member.voice.channel) {
			return message.util.reply('Join a voice channel first, bitc*');
		} else if (!message.member.voice.channel.joinable) {
			return message.util.reply("I don't seem to have permission to enter this voice channel.");
		} else if (!message.member.voice.channel.speakable) {
			return message.util.send("I don't seem to have permission to talk in this voice channel.");
		} else if (message.guild.me.voice.channel && message.member.voice.channelID !== message.guild.me.voice.channelID) {
			if (Boolean(message.guild.me.voice.channel.members.filter(m => !m.user.bot).size > 1)) {
				return message.util.send(`You need to be listening in **${message.guild.me.voice.channel.name}** to do queue songs.`);
			}
		}


		if (!query && message.attachments.first()) {
			query = message.attachments.first().url;
			if (!['.mp3', '.ogg', '.flac', '.m4a'].includes(path.parse(url.parse(query).path).ext)) return;
		} else if (!query) {
			return;
		}
		if (!['http:', 'https:'].includes(url.parse(query).protocol)) query = `ytsearch:${query}`;
		const res = await this.client.music.load(query);
		const queue = this.client.music.queues.get(message.guild.id);
		if (!message.guild.me.voice.channel || message.guild.me.voice.channel.members.filter(m => !m.user.bot).size < 1) await queue.player.join(message.member.voice.channel.id, { deaf: true });
		let msg;
		if (['TRACK_LOADED', 'SEARCH_RESULT'].includes(res.loadType)) {
			if (unshift) await queue.unshift(res.tracks[0].track);
			else await queue.add(res.tracks[0].track);
			msg = res.tracks[0].info.title;
		} else if (res.loadType === 'PLAYLIST_LOADED') {
			await queue.add(...res.tracks.map(track => track.track));
			msg = `${res.playlistInfo.name} (Playlist)`;
		} else {
			return message.util.send(`Are you sure \`\`${query.replace('ytsearch', '')}\`\` is a thing to play? I couldn't find it!`);
		}
		if (!queue.player.playing && !queue.player.paused) await queue.start();

		return message.util.send(`**Queued up:** \`${msg}\``);
	}
}

module.exports = PlayCommand;
