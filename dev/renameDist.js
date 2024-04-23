import { rename } from 'node:fs/promises';
import { resolve as resolvePath } from 'node:path';
import { cwd } from 'node:process';

const oldPath = resolvePath( cwd(), 'dist', 'index.js' );
const newPath = resolvePath( cwd(), 'dist', 'index.mjs' );

await rename( oldPath, newPath );
