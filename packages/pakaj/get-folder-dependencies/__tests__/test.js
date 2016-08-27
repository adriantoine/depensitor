import fs from 'fs';
import test from 'ava';

import mockfs from 'mock-fs';
import mountfs from 'mountfs';

import getFolderDependencies from '../';

mountfs.patchInPlace();

fs.mount('/some/test/directory/', mockfs.fs({
	'/some/test/directory': {
		'some-file.js': 'import "addToNumber";'
	},
}));

test('get all dependencies from a folder', t => {
	t.plan(1);
	return getFolderDependencies('/some/test/directory/**').then(deps => {
		t.deepEqual(deps, ['addToNumber']);
	});
});

test('get all dependencies from a real folder', t => {
	t.plan(1);
	return getFolderDependencies('../../get-file-dependencies/__tests__/fixtures/**').then(deps => {
		t.deepEqual(deps, ['addToNumber', 'oneHundredPackage', 'unusedDep', 'oneHundred', 'otherVar', '@test/my-org']);
	});
});
