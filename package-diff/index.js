import builtinModules from 'builtin-modules';
import getFolderDependencies from '../get-folder-dependencies';

export default (pattern, pkg) => {
	if (!pkg || (!pkg.dependencies && !pkg.devDependencies)) {
		return;
	}

	return getFolderDependencies(pattern)
		.then(deps => {
			const pkgDeps = []
				.concat(Object.keys(pkg.dependencies))
				.concat(Object.keys(pkg.devDependencies));

			const missing = deps
				.filter(dep => builtinModules.indexOf(dep) === -1)
				.filter(dep => pkgDeps.indexOf(dep) === -1);

			const unused = pkgDeps.filter(dep => deps.indexOf(dep) === -1);

			return {missing, unused};
		});
};
