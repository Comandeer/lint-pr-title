import test from 'ava';
import lint from '../src/lint.js';

test( 'lint() is a function', ( t ) => {
	t.is( typeof lint, 'function' );
} );

test( 'lint() returns true when provided with title adhering to Conventional Commits rules', async ( t ) => {
	const result = await lint( 'chore(package): boilerplate' );

	t.is( result, true );
} );

test( 'lint() returns false when provided with title breaking the Conventional Commits rules', async ( t ) => {
	const result = await lint( 'hublabubla' );

	t.is( result, false );
} );
