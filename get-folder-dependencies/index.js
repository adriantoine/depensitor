import fs from 'fs';
import path from 'path';
import os from 'os';
import globby from 'globby';
import throat from 'throat';
import flatten from 'lodash.flatten';
import uniq from 'lodash.uniq';

import getFilesDependencies from '../get-file-dependencies';

export default patterns => {
	const files = globby.sync(patterns);
	const deps = files
		.map(
			throat(os.cpus().length, file => {
				const resolvedName = path.resolve(process.cwd(), file);
				const stats = fs.lstatSync(resolvedName);
				if (!stats.isFile() || stats.size > 100 * 1000) {
					return;
				}

				const fileContent = fs.readFileSync(resolvedName, 'utf8');
				const fileDependencies = getFilesDependencies(fileContent);
				return fileDependencies;
			})
		);

	return Promise.all(deps).then(files => uniq(flatten(files)).filter(val => val));
};
