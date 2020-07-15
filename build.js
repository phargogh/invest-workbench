'use strict';

const spawnSync = require('child_process').spawnSync;
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

const SRC_DIR = 'src'
const BUILD_DIR = 'build'

if (!fs.existsSync(BUILD_DIR)) {
	fs.mkdirSync(BUILD_DIR)
}

// transpile all jsx and es6 files to javascript
// excluding ResultsTab jsx because we've temporarily removed that feature
const cmdArgs = [SRC_DIR, '-d', BUILD_DIR, '--ignore', '**/ResultsTab/*']
const runBabel = spawnSync('npx babel', cmdArgs, {
        shell: true, 
      });

console.log(`${runBabel.stdout}`)
if (runBabel.stderr) {
	console.log(`${runBabel.stderr}`)
}

// copy all other files to their same relative location in the build dir
glob(SRC_DIR.concat(path.sep, '**', path.sep, '*'), (err, files) => {
	files.forEach(file => {
		if (['.css', '.html', '.json'].includes(path.extname(file))) {
			const dest = file.replace(SRC_DIR, BUILD_DIR)
			fs.copySync(file, dest)
		}
	})
})
