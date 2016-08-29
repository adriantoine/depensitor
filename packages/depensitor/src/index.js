// import flow from 'lodash.flow';
import globby from 'globby';

import getFileDependencies from './get-file-dependencies';
import getFolderDependencies from './get-folder-dependencies';
import packageDiff from './package-diff';

export default ({path, pkg}) => {
	// const visitor = flow(plugins.visitor, getFileDependencies);

	return getFolderDependencies(globby.sync(path), getFileDependencies)
		.then(deps => packageDiff(deps, pkg));
};
