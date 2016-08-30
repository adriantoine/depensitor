import _ from 'lodash/fp';

import getPluginDiff from '../utils/plugin-diff';

export default (deps, pkg, plugins) => {
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

	const diff = {
		missing: _.difference(deps, pkgDeps),
		unused: _.difference(pkgDeps, deps),
	};

	if (!plugins || plugins.length === 0) {
		return diff;
	}

	const pluginDiffs = plugins.map(plugin => getPluginDiff(diff, plugin(diff)));

	// Merge all plugin arrays
	const reducedPluginDiff = pluginDiffs.reduce((obj, pluginDiff) => {
		obj.missing.added = obj.missing.added.concat(pluginDiff.missing.added);
		obj.missing.removed = obj.missing.removed.concat(pluginDiff.missing.removed);
		obj.unused.added = obj.unused.added.concat(pluginDiff.unused.added);
		obj.unused.removed = obj.unused.removed.concat(pluginDiff.unused.removed);
		return obj;
	}, {missing: {added: [], removed: []}, unused: {added: [], removed: []}});

	// Dedupe these arrays
	const dedupePluginDiff = {
		missing: {
			added: _.uniq(reducedPluginDiff.missing.added),
			removed: _.uniq(reducedPluginDiff.missing.removed),
		},
		unused: {
			added: _.uniq(reducedPluginDiff.unused.added),
			removed: _.uniq(reducedPluginDiff.unused.removed),
		},
	};

	const finalDiffs = Object.assign({}, diff);

	// Add added dependencies
	finalDiffs.missing = finalDiffs.missing.concat(dedupePluginDiff.missing.added);
	finalDiffs.unused = finalDiffs.unused.concat(dedupePluginDiff.unused.added);

	// Remove removed dependencies
	finalDiffs.missing = _.difference(finalDiffs.missing, dedupePluginDiff.missing.removed);
	finalDiffs.unused = _.difference(finalDiffs.unused, dedupePluginDiff.unused.removed);

	return finalDiffs;
};
