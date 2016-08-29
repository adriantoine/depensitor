// import flow from 'lodash.flow';
import globby from 'globby';

import getFileDependencies from './get-file-dependencies';
import getFolderDependencies from './get-folder-dependencies';
import packageDiff from './package-diff';

export default ({paths, pkg}) => {
	// const visitor = flow(plugins.visitor, getFileDependencies);
	console.log(paths);

	return getFolderDependencies(globby.sync(paths), getFileDependencies)
		.then(deps => packageDiff(deps, pkg));
};
