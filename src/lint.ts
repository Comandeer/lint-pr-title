import load from '@commitlint/load';
import commitLint from '@commitlint/lint';

export default async function lint( title: string ): Promise<boolean> {
	const config = {
		extends: [
			'@commitlint/config-conventional'
		]
	};
	const opts = await load( config );
	const lintOptions = opts.parserPreset?.parserOpts !== undefined && opts.parserPreset.parserOpts !== null ?
		{
			parserOpts: opts.parserPreset.parserOpts
		} :
		{};
	const report = await commitLint( title, opts.rules, lintOptions );

	return report.valid;
}
