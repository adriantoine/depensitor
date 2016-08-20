import test from 'ava';
import getFolderDependencies from '../';

test('get all dependencies from a folder', t => {
	t.plan(1);
	return getFolderDependencies('../../get-file-dependencies/__tests__/fixtures/**').then(deps => {
		t.deepEqual(deps, ['addToNumber', 'oneHundredPackage', 'unusedDep', 'oneHundred', 'otherVar', '@test/my-org']);
	});
});
