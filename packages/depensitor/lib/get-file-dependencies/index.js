import _ from 'lodash/fp';

import {parse} from 'babylon';
import traverse from 'babel-traverse';
import * as t from 'babel-types';

import isModule from '../utils/is-module';
import getRootDep from '../utils/get-root-dep';

// Options for the babylon parser
const babylonOptions = {
	sourceType: 'module',
	allowImportExportEverywhere: false,
	allowReturnOutsideFunction: false,
	plugins: [
		'asyncFunctions',
		'asyncGenerators',
		'classConstructorCall',
		'classProperties',
		'decorators',
		'doExpressions',
		'exponentiationOperator',
		'exportExtensions',
		'flow',
		'functionSent',
		'functionBind',
		'jsx',
		'objectRestSpread',
		'trailingFunctionCommas',
	],
};

// Getters
const getCallee = _.get('node.callee.name');
const getRequireDepName = _.flow(_.get('node.arguments[0].value'), getRootDep);
const getImportDepName = _.flow(_.get('node.source.value'), getRootDep);

export default file => {
	const imports = [];
	const ast = parse(file, babylonOptions);

	traverse(ast, {
		enter(path) {
			let name = null;
			if (t.isCallExpression(path.node) && getCallee(path) === 'require') {
				name = getRequireDepName(path);
			}

			if (t.isImportDeclaration(path.node)) {
				name = getImportDepName(path);
			}

			if (isModule(name)) {
				imports.push(name);
			}

			return false;
		},
	});

	return _.uniq(imports);
};
