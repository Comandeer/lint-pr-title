import validate from 'commitplease/lib/validate.js';

export default async function lint( title: string ): Promise<boolean> {
	const errors = validate( title, {
		style: 'angular',
		types: [
			'feat',
			'fix',
			'docs',
			'style',
			'refactor',
			'perf',
			'test',
			'build',
			'ci',
			'chore',
			'revert'
		],
		scope: '\\S+.*',
		limits: {
			firstLine: 100,
			otherLine: 0
		}
	} );

	return errors.length === 0;
}
