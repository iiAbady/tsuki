const { Command, Flag } = require('discord-akairo');
const { stripIndents } = require('common-tags');

class PlaylistCommand extends Command {
	constructor() {
		super('playlist', {
			aliases: ['playlist', 'pl'],
			description: {
				content: stripIndents`
					 • create \`<playlist>\` \`[info]\`
					 • add \`<playlist>\` \`<link/playlist>\`
					 • load \`<playlist>\`
					 • remove \`<playlist>\` \`<position>\`
					 • edit \`<playlist>\` \`<info>\`
					 • del \`<playlist>\`
					 • show \`<playlist>\` \`[page]\`
					 • info \`<playlist>\`
					 • list \`[member]\` \`[page]\`
					 • all
					 • search \`<name>\`
				`,
				usage: '<method> <...arguments>',
				examples: [
					'create Test',
					'create Test description',
					'load Test',
					'add Test <link/playlist>',
					'remove Test 3',
					'edit Test info',
					'show Test',
					'show Test 3',
					'info Test',
					'list Abady 2',
					'list xRokz 5',
					'search jpop'
				]
			},
			category: 'music',
			channel: 'guild',
			ratelimit: 2
		});
	}

	*args() {
		const method = yield {
			type: [
				['playlist-show', 'show'],
				['playlist-create', 'create'],
				['playlist-add', 'add'],
				['playlist-load', 'load'],
				['playlist-remove', 'rm', 'remove'],
				['playlist-delete', 'del', 'delete'],
				['playlist-edit', 'edit'],
				['playlist-info', 'info'],
				['playlist-list', 'list'],
				['playlist-all', 'all'],
				['playlist-search', 'search']
			],
			otherwise: ''
		};
		return Flag.continue(method);
	}
}

module.exports = PlaylistCommand;
