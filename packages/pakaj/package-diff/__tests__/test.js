import test from 'ava';
import packageDiff from '../';
import pkg from './fixtures/package';

test('makes a package difference', t => {
	t.plan(1);
	return packageDiff('../../get-file-dependencies/__tests__/fixtures/**', pkg).then(deps => {
		t.deepEqual(deps, {
			missing: [
				'oneHundredPackage',
				'unusedDep',
				'otherVar',
				'@test/my-org'
			],
			unused: [
				'unused-addToNumber'
			]
		});
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
