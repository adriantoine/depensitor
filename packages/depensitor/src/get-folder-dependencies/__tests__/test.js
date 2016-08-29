import fs from 'fs';
import test from 'ava';
import sinon from 'sinon';

import getFolderDependencies from '../';

const stubReadFile = () => sinon.stub(fs, 'readFileSync');
const restoreReadFile = () => fs.readFileSync.restore();

test.before(() => {
	sinon.stub(fs, 'lstatSync').returns({isFile: () => true});
});
test.after(() => {
	fs.lstatSync.restore();
});

test('calls the visitor with the content of the given file', t => {
	stubReadFile().returns(`var test = require 'dep';`);

	const visitor = sinon.stub().returns(['dep']);
	return getFolderDependencies(['filename.js'], visitor).then(deps => {
		t.deepEqual(deps, ['dep']);
		t.true(visitor.calledOnce);
		t.true(visitor.calledWith(`var test = require 'dep';`));
		restoreReadFile();
	});
});
