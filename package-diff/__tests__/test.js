import test from 'ava';
import packageDiff from '../';
import pkg from './fixtures/package';

test('package difference', t => {
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
