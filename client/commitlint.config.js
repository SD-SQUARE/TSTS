export default {
	rules: {
		'type-enum': [
			2,
			'always',
			['feat', 'fix', 'add', 'docs', 'style', 'refactor', 'test', 'chore'],
		],
		'subject-empty': [2, 'never'],
		'type-case': [2, 'always', 'lower-case'],
	},
	parserPreset: {
		parserOpts: {
			// Match either [type]: subject OR type: subject
			headerPattern: /^\[?(\w+)\]?:\s(.+)$/,
			headerCorrespondence: ['type', 'subject'],
		},
	},
}
