declare module 'commitplease/lib/validate.js' {
	export interface ValidateOptions {
		style: 'angular';
		types: Array<string>;
		scope: string;
		limits: {
			firstLine: number;
			otherLine: number;
		};
	}
	export default function validate( message: string, options: ValidateOptions ): Array<string>;
}
