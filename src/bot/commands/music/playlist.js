const { Command } = require('discord-akairo');
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
			ratelimit: 2,
			args: [
				{
					id: 'method',
					type: ['create', 'add', 'load', 'rm', 'remove', 'del', 'delete', 'edit', 'show', 'info', 'list', 'all']
				},
				{
					'id': 'args',
					'match': 'rest',
					'default': ''
				}
			]
		});
	}

	exec(message, { method, args }) {
		if (!method) return;
		const command = {
			'create': this.handler.modules.get('playlist-create'),
			'load': this.handler.modules.get('playlist-load'),
			'add': this.handler.modules.get('playlist-add'),
			'rm': this.handler.modules.get('playlist-remove'),
			'remove': this.handler.modules.get('playlist-remove'),
			'del': this.handler.modules.get('playlist-delete'),
			'delete': this.handler.modules.get('playlist-delete'),
			'edit': this.handler.modules.get('playlist-edit'),
			'show': this.handler.modules.get('playlist-show'),
			'info': this.handler.modules.get('playlist-info'),
			'list': this.handler.modules.get('playlist-list'),
			'all': this.handler.modules.get('playlist-all')
		}[method];

		return this.handler.handleDirectCommand(message, args, command, true);
	}
}

module.exports = PlaylistCommand;
