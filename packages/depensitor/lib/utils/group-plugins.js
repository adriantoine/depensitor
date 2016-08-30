import _ from 'lodash/fp';

export default plugins => {
	return plugins.reduce((obj, plugin) => {
		if (plugin.visitor && _.isFunction(plugin.visitor)) {
			obj.visitors.push(plugin.visitor);
		}

		if (plugin.diff && _.isFunction(plugin.diff)) {
			obj.diffs.push(plugin.diff);
		}

		return obj;
	}, {visitors: [], diffs: []});
};
