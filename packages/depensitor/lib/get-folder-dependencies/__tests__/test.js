import fs from 'fs';
import path from 'path';
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

test.serial('calls the visitor with the content of the given file and gets the right dependencies', t => {
	stubReadFile().returns('file content');

	const visitor = sinon.stub().returns(['dep']);
	return getFolderDependencies(['filename.js'], visitor).then(deps => {
		t.deepEqual(deps, ['dep']);
		t.true(visitor.calledOnce);
		t.true(visitor.calledWith('file content'));
		restoreReadFile();
	});
});

test.serial('calls the visitor on each given file and get the right dependencies', t => {
	const readFile = stubReadFile();
	readFile.withArgs(path.resolve(__dirname, 'filename1.js')).returns('file content 1');
	readFile.withArgs(path.resolve(__dirname, 'filename2.js')).returns('file content 2');
	readFile.withArgs(path.resolve(__dirname, 'filename3.js')).returns('file content 3');

	const visitor = sinon.stub();
	visitor.withArgs('file content 1').returns(['dep1']);
	visitor.withArgs('file content 2').returns(['dep2']);
	visitor.withArgs('file content 3').returns(['dep3']);

	return getFolderDependencies(['filename1.js', 'filename2.js', 'filename3.js'], visitor).then(deps => {
		t.deepEqual(deps, ['dep1', 'dep2', 'dep3']);
		t.is(visitor.callCount, 3);
		t.true(visitor.calledWith('file content 1'));
		t.true(visitor.calledWith('file content 2'));
		t.true(visitor.calledWith('file content 3'));
		restoreReadFile();
	});
});

test.serial('flattens the returned dependencies', t => {
	const readFile = stubReadFile();
	readFile.withArgs(path.resolve(__dirname, 'filename1.js')).returns('file content 1');
	readFile.withArgs(path.resolve(__dirname, 'filename2.js')).returns('file content 2');

	const visitor = sinon.stub();
	visitor.withArgs('file content 1').returns(['dep1', ['dep2']]);
	visitor.withArgs('file content 2').returns(['dep3', 'dep4']);

	return getFolderDependencies(['filename1.js', 'filename2.js'], visitor).then(deps => {
		t.deepEqual(deps, ['dep1', 'dep2', 'dep3', 'dep4']);
		restoreReadFile();
	});
});

test.serial('dedupes the returned dependencies', t => {
	const readFile = stubReadFile();
	readFile.withArgs(path.resolve(__dirname, 'filename1.js')).returns('file content 1');
	readFile.withArgs(path.resolve(__dirname, 'filename2.js')).returns('file content 2');

	const visitor = sinon.stub();
	visitor.withArgs('file content 1').returns(['dep1', ['dep2']]);
	visitor.withArgs('file content 2').returns(['dep2', 'dep3', 'dep1']);

	return getFolderDependencies(['filename1.js', 'filename2.js'], visitor).then(deps => {
		t.deepEqual(deps, ['dep1', 'dep2', 'dep3']);
		restoreReadFile();
	});
});

test.serial('handle a visitor array with one element', t => {
	stubReadFile().returns('file content');

	const visitor = sinon.stub().returns(['dep']);
	return getFolderDependencies(['filename.js'], [visitor]).then(deps => {
		t.deepEqual(deps, ['dep']);
		t.true(visitor.calledOnce);
		t.true(visitor.calledWith('file content'));
		restoreReadFile();
	});
});

test.serial('handle a visitor array with multiple elements', t => {
	stubReadFile().returns('file content');

	const visitor1 = sinon.stub().returns(['dep1']);
	const visitor2 = sinon.stub().returns(['dep2']);
	const visitor3 = sinon.stub().returns(['dep3', 'dep4', ['dep5']]);
	return getFolderDependencies(['filename.js'], [visitor1, visitor2, visitor3]).then(deps => {
		t.deepEqual(deps, ['dep1', 'dep2', 'dep3', 'dep4', 'dep5']);

		t.true(visitor1.calledOnce);
		t.true(visitor1.calledWith('file content'));

		t.true(visitor2.calledOnce);
		t.true(visitor2.calledWith('file content'));

		t.true(visitor3.calledOnce);
		t.true(visitor3.calledWith('file content'));

		restoreReadFile();
	});
});
