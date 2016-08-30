import fs from 'fs';
import path from 'path';
import os from 'os';
import throat from 'throat';
import uniq from 'lodash.uniq';
import flattenDeep from 'lodash.flattendeep';

const flattenDedupe = deps => uniq(flattenDeep(deps).filter(val => val));

export default (files, dependencyFinder) => {
	const deps = files
		.map(
			throat(os.cpus().length, file => {
				const resolvedName = path.resolve(process.cwd(), file);
				const stats = fs.lstatSync(resolvedName);
				if (!stats.isFile() || stats.size > 100 * 1000) {
					return;
				}

				const fileContent = fs.readFileSync(resolvedName, 'utf8');
				return dependencyFinder(fileContent);
			})
		);

	return Promise.all(deps).then(files => flattenDedupe(files));
};
