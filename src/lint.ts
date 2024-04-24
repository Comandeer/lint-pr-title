/* eslint-disable no-console */

const allowedTypes = [
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
] as const;
const ccRegex = /^(?<type>[a-z]+)(?<scope>\(\S+\))?: (?<summary>.+)$/;
const capitalLetterRegex = /^[A-Z]/;

interface CCRegexGroups {
	type: string;
	scope: string | undefined;
	summary: string;
}

export interface LintResult {
	valid: boolean;
	errors: Array<string>;
}

export default function lint( title: string ): LintResult {
	const errors: Array<string> = [];
	const lines = title.split( '\n' );

	if ( lines.length > 1 ) {
		errors.push( 'The PR title can only contain one line' );
	}

	const matched = title.match( ccRegex );

	if ( matched === null ) {
		errors.push( 'The PR title does not match the format of a Conventional Commit message' );
	} else {
		const { type, scope, summary } = matched.groups as unknown as CCRegexGroups;

		if ( !allowedTypes.includes( type as typeof allowedTypes[ number ] ) ) {
			errors.push( `The provided type is not one of the allowed types: ${ allowedTypes.join( ', ' ) }` );
		}

		if ( scope !== undefined && scope !== scope.toLowerCase() ) {
			errors.push( 'The provided scope should be all lower-cased' );
		}

		if ( capitalLetterRegex.test( summary ) ) {
			errors.push( 'The summary of changes should not start with a capital letter' );
		}

		if ( summary.endsWith( '.' ) ) {
			errors.push( 'The summary of changes should not end with a period' );
		}
	}

	return {
		valid: errors.length === 0,
		errors
	};
}
