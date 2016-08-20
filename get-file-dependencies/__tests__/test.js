import fs from 'fs';
import path from 'path';
import test from 'ava';
import getFileDependencies from '../';

const readFixture = filename => fs.readFileSync(path.join(__dirname, filename), 'utf8');

test('should detect the single dep', t => {
	const deps = getFileDependencies(readFixture('fixtures/single-cjs.js'));
	t.deepEqual(deps, ['addToNumber']);

	const importDeps = getFileDependencies(readFixture('fixtures/single-es6.js'));
	t.deepEqual(importDeps, ['addToNumber']);
});

test('should detect multiple dep', t => {
	const deps = getFileDependencies(readFixture('fixtures/multiple-cjs.js'));
	t.deepEqual(deps, ['addToNumber', 'oneHundredPackage', 'unusedDep', 'otherVar']);

	const importDeps = getFileDependencies(readFixture('fixtures/multiple-es6.js'));
	t.deepEqual(importDeps, ['addToNumber', 'oneHundredPackage', 'unusedDep', 'otherVar']);
});

test('should detect deps and dedupe', t => {
	const deps = getFileDependencies(readFixture('fixtures/dupe-cjs.js'));
	t.deepEqual(deps, ['addToNumber', 'oneHundred', 'unusedDep']);

	const importDeps = getFileDependencies(readFixture('fixtures/dupe-es6.js'));
	t.deepEqual(importDeps, ['addToNumber', 'oneHundred', 'unusedDep']);
});

test('should detect deps and ignore local requires', t => {
	const deps = getFileDependencies(readFixture('fixtures/local-cjs.js'));
	t.deepEqual(deps, ['addToNumber', 'oneHundredPackage', 'unusedDep', 'otherVar']);

	const importDeps = getFileDependencies(readFixture('fixtures/local-es6.js'));
	t.deepEqual(importDeps, ['addToNumber', 'oneHundredPackage', 'unusedDep', 'otherVar']);
});

test('should detect root deps and dedupe', t => {
	const deps = getFileDependencies(readFixture('fixtures/subfolder-cjs.js'));
	t.deepEqual(deps, ['addToNumber', 'oneHundredPackage', 'unusedDep', 'otherVar']);

	const importDeps = getFileDependencies(readFixture('fixtures/subfolder-es6.js'));
	t.deepEqual(importDeps, ['addToNumber', 'oneHundredPackage', 'unusedDep', 'otherVar']);
});

test('should detect deps with destructuring', t => {
	const deps = getFileDependencies(readFixture('fixtures/destructuring-cjs.js'));
	t.deepEqual(deps, ['addToNumber', 'oneHundredPackage', 'unusedDep']);

	const importDeps = getFileDependencies(readFixture('fixtures/destructuring-es6.js'));
	t.deepEqual(importDeps, ['addToNumber', 'oneHundredPackage', 'unusedDep']);
});

test('should get the right dependency name for private modules', t => {
	const deps = getFileDependencies(readFixture('fixtures/private-cjs.js'));
	t.deepEqual(deps, ['@test/my-org']);

	const importDeps = getFileDependencies(readFixture('fixtures/private-es6.js'));
	t.deepEqual(importDeps, ['@test/my-org']);
});
