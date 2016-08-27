import builtinModules from 'builtin-modules';
import getFolderDependencies from '../get-folder-dependencies';

export default (pattern, pkg) => {
	if (!pkg) {
		throw new Error('You need to provide a package.json file');
	}

	if (!pkg.dependencies && !pkg.devDependencies) {
		throw new Error('The provided package.json file doesn\'t have any dependencies');
	}

	const pkgDeps = []
		.concat(Object.keys(pkg.dependencies))
		.concat(Object.keys(pkg.devDependencies));

	if (pkgDeps.length === 0) {
		throw new Error('The provided package.json file doesn\'t have any dependencies');
	}

	return getFolderDependencies(pattern)
		.then(deps => {
			const missing = deps
				.filter(dep => builtinModules.indexOf(dep) === -1)
				.filter(dep => pkgDeps.indexOf(dep) === -1);

			const unused = pkgDeps.filter(dep => deps.indexOf(dep) === -1);

			return {missing, unused};
		});
};
