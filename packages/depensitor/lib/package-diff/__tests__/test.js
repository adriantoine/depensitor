import test from 'ava';
import sinon from 'sinon';
import packageDiff from '../';
import pkg from './fixtures/package';

test('makes a package difference', t => {
	const diff = packageDiff(['dep-one', 'dep-two', 'dep-four'], pkg);

	t.deepEqual(diff, {
		missing: ['dep-four'],
		unused: ['dep-five'],
	});
});

test('throws an error when no package is provided', t => {
	t.throws(
		() => packageDiff('../../get-file-dependencies/__tests__/fixtures/**', null),
		'You need to provide a package.json file',
	);
});

test('throws an error when no deps are in the package', t => {
	t.throws(
		() => packageDiff('../../get-file-dependencies/__tests__/fixtures/**', {}),
		'The provided package.json file doesn\'t have any dependencies',
	);
});

test('throws an error when empty dependencies object is provided', t => {
	t.throws(
		() => packageDiff('../../get-file-dependencies/__tests__/fixtures/**', {dependencies: {}, devDependencies: {}}),
		'The provided package.json file doesn\'t have any dependencies',
	);
});

test('can use a single plugin', t => {
	const plugin = sinon.stub().returns({
		missing: ['dep-four', 'plugin-missing'],
		unused: ['plugin-unused'],
	});

	const diff = packageDiff(['dep-one', 'dep-two', 'dep-four'], pkg, [plugin]);

	t.true(plugin.calledOnce);
	t.deepEqual(plugin.lastCall.args[0], {
		missing: ['dep-four'],
		unused: ['dep-five'],
	});

	t.deepEqual(diff, {
		missing: ['dep-four', 'plugin-missing'],
		unused: ['plugin-unused'],
	});
});

test('can use several plugins', t => {
	const plugin1 = sinon.stub().returns({
		missing: ['dep-four', 'plugin1-missing'],
		unused: ['plugin1-unused'],
	});
	const plugin2 = sinon.stub().returns({
		missing: ['plugin2-missing'],
		unused: ['dep-five', 'plugin2-unused'],
	});

	const diff = packageDiff(['dep-one', 'dep-two', 'dep-four'], pkg, [plugin1, plugin2]);

	t.true(plugin1.calledOnce);
	t.deepEqual(plugin1.lastCall.args[0], {
		missing: ['dep-four'],
		unused: ['dep-five'],
	});
	t.true(plugin2.calledOnce);
	t.deepEqual(plugin2.lastCall.args[0], {
		missing: ['dep-four'],
		unused: ['dep-five'],
	});

	t.deepEqual(diff, {
		missing: ['plugin1-missing', 'plugin2-missing'],
		unused: ['plugin1-unused', 'plugin2-unused'],
	});
});
