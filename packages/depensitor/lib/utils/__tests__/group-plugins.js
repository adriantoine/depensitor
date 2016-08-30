import test from 'ava';
import sinon from 'sinon';
import composePlugins from '../group-plugins';

test('compose a set of plugins', t => {
	const plugin1 = {
		visitor: sinon.spy(),
		diff: sinon.spy(),
	};
	const plugin2 = {
		visitor: sinon.spy(),
		diff: sinon.spy(),
	};

	const composed = composePlugins([plugin1, plugin2]);

	t.deepEqual(composed.visitors, [plugin1.visitor, plugin2.visitor]);
	t.deepEqual(composed.diffs, [plugin1.diff, plugin2.diff]);
});

test('compose only visitors', t => {
	const plugin1 = {
		visitor: sinon.spy(),
	};
	const plugin2 = {
		visitor: sinon.spy(),
	};

	const composed = composePlugins([plugin1, plugin2]);
	t.deepEqual(composed.visitors, [plugin1.visitor, plugin2.visitor]);
});

test('compose only diffs', t => {
	const plugin1 = {
		diff: sinon.spy(),
	};
	const plugin2 = {
		diff: sinon.spy(),
	};

	const composed = composePlugins([plugin1, plugin2]);
	t.deepEqual(composed.diffs, [plugin1.diff, plugin2.diff]);
});

test('don\'t compose elements that are not functions', t => {
	const plugin1 = {
		visitor: 'test',
		diff: sinon.spy(),
	};
	const plugin2 = {
		visitor: sinon.spy(),
		diff: 1,
	};

	const composed = composePlugins([plugin1, plugin2]);
	t.deepEqual(composed.visitors, [plugin2.visitor]);
	t.deepEqual(composed.diffs, [plugin1.diff]);
});
