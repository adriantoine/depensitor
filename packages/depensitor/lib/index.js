import globby from 'globby';

import composePlugins from './utils/compose-plugins';

import getFileDependencies from './get-file-dependencies';
import getFolderDependencies from './get-folder-dependencies';
import packageDiff from './package-diff';

export default ({paths, pkg, plugins}) => {
	const composedPlugins = composePlugins(plugins);

	return getFolderDependencies(globby.sync(paths), [getFileDependencies, ...composedPlugins.visitors])
		.then(deps => packageDiff(deps, pkg, composedPlugins.diffs));
};
