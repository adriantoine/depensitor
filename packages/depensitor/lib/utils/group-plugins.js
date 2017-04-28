import _ from 'lodash/fp';

const EMPTY_OBJECT = {visitors: [], diffs: []};

export default plugins => {
	if(!plugins || plugin.length === 0) {
		return Object.assign({}, EMPTY_OBJECT);
	}

	return plugins.reduce((obj, plugin) => {
		if (plugin.visitor && _.isFunction(plugin.visitor)) {
			obj.visitors.push(plugin.visitor);
		}

		if (plugin.diff && _.isFunction(plugin.diff)) {
			obj.diffs.push(plugin.diff);
		}

		return obj;
	}, Object.assign({}, EMPTY_OBJECT));
};
