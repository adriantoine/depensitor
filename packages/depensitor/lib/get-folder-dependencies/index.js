import fs from 'fs';
import path from 'path';
import os from 'os';
import throat from 'throat';
import _ from 'lodash';

const flattenDedupe = _.flow(_.filter(val => val), _.flattenDeep, _.uniq);

export default (files, visitors) => {
	let visitor = visitors;
	if (_.isArray(visitor) && visitor.length > 0) {
		if (visitor.length === 1) {
			visitor = visitor[0];
		} else {
			visitor = content => visitors.map(v => v(content));
		}
	}

	const deps = files
		.map(
			throat(os.cpus().length, file => {
				const resolvedName = path.resolve(process.cwd(), file);
				const stats = fs.lstatSync(resolvedName);
				if (!stats.isFile() || stats.size > 100 * 1000) {
					return;
				}

				const fileContent = fs.readFileSync(resolvedName, 'utf8');

				return visitor(fileContent);
			})
		);

	return Promise.all(deps).then(files => flattenDedupe(files));
};
