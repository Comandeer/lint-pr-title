import * as core from '@actions/core';
import { context, getOctokit } from '@actions/github';
import lint from './lint.js';

try {
	const token = core.getInput( 'token', {
		required: true
	} );
	const octokit = getOctokit( token );
	const prMetadata = issueToPR( context.issue );
	const { data: prData } = await octokit.rest.pulls.get( prMetadata );
	const result = lint( prData.title );

	if ( !result ) {
		core.setFailed( 'The PR title does not adhere to the Conventional Commits rules' );
	}
} catch ( error ) {
	core.setFailed( `PR title linter errored: ${ String( error ) } }` );
}

interface PRMetadata {
	[ rest: string ]: unknown;
	owner: string;
	repo: string;
	pull_number: number;
}

function issueToPR( issue: typeof context.issue ): PRMetadata {
	return {
		owner: issue.owner,
		repo: issue.repo,
		// eslint-disable-next-line camelcase
		pull_number: issue.number
	};
}
