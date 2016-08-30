import test from 'ava';
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
