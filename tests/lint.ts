import test from 'ava';
import lint, { LintResult } from '../src/lint.js';

test( 'lint() is a function', ( t ) => {
	t.is( typeof lint, 'function' );
} );

test( 'lint() returns valid result when provided title adheres to Conventional Commits rules', ( t ) => {
	const result = lint( 'chore(package): boilerplate' );

	t.deepEqual( result, {
		valid: true,
		errors: []
	} satisfies LintResult );
} );

test( 'lint() returns true when provided title does not contain scope', ( t ) => {
	const result = lint( 'chore: boilerplate' );

	t.deepEqual( result, {
		valid: true,
		errors: []
	} satisfies LintResult );
} );

test( 'lint() returns false when provided title breaks the Conventional Commits rules', ( t ) => {
	const result = lint( 'hublabubla' );

	t.deepEqual( result, {
		valid: false,
		errors: [
			'The PR title does not match the format of a Conventional Commit message'
		]
	} satisfies LintResult );
} );

test( 'lint() returns false when there is a space before the colon', ( t ) => {
	const result = lint( 'chore : boilerplate' );

	t.deepEqual( result, {
		valid: false,
		errors: [
			'The PR title does not match the format of a Conventional Commit message'
		]
	} satisfies LintResult );
} );

test( 'lint() returns false when there is no space after the colon', ( t ) => {
	const result = lint( 'chore:boilerplate' );

	t.deepEqual( result, {
		valid: false,
		errors: [
			'The PR title does not match the format of a Conventional Commit message'
		]
	} satisfies LintResult );
} );

test( 'lint() returns false when provided title contains more than one line', ( t ) => {
	const result = lint( 'chore: boilerplate\nNext line' );

	t.deepEqual( result, {
		valid: false,
		errors: [
			'The PR title can only contain one line',
			'The PR title does not match the format of a Conventional Commit message'
		]
	} satisfies LintResult );
} );

test( 'lint() returns false when provided title\'s type is not an allowed one', ( t ) => {
	const result = lint( 'whatever: boilerplate' );

	t.is( result.valid, false );
	t.true( result.errors[ 0 ]?.startsWith( 'The provided type is not one of the allowed types:' ) );
} );

test( 'lint() returns false when provided scope is not lower-cased', ( t ) => {
	const result = lint( 'chore(whatEver): boilerplate' );

	t.deepEqual( result, {
		valid: false,
		errors: [
			'The provided scope should be all lower-cased'
		]
	} satisfies LintResult );
} );

test( 'lint() returns false when summary starts with a capital letter', ( t ) => {
	const result = lint( 'chore: Boilerplate' );

	t.deepEqual( result, {
		valid: false,
		errors: [
			'The summary of changes should not start with a capital letter'
		]
	} satisfies LintResult );
} );

test( 'lint() returns false when summary ends with a period', ( t ) => {
	const result = lint( 'chore: boilerplate.' );

	t.deepEqual( result, {
		valid: false,
		errors: [
			'The summary of changes should not end with a period'
		]
	} satisfies LintResult );
} );
