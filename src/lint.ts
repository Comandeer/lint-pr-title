import validate from 'commitplease/lib/validate.js';

export default function lint( title: string ): boolean {
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

	// eslint-disable-next-line no-console
	console.log( 'Found issues:', errors );

	return errors.length === 0;
}
