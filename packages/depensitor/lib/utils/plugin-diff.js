import _ from 'lodash/fp';

export default (pkgDiff, pluginDiff) => {
	const pkg = Object.assign({}, pkgDiff);
	const plug = Object.assign({}, pluginDiff);

	return {
		missing: {
			added: _.difference(plug.missing, pkg.missing),
			removed: _.difference(pkg.missing, plug.missing),
		},
		unused: {
			added: _.difference(plug.unused, pkg.unused),
			removed: _.difference(pkg.unused, plug.unused),
		},
	};
};
