import get from 'lodash.get';
import {parse} from 'babylon';
import traverse from 'babel-traverse';
import * as t from 'babel-types';

import uniq from 'lodash.uniq';
import isModule from '../utils/is-module';
import getRootDep from '../utils/get-root-dep';

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
		'trailingFunctionCommas'
	]
};

export default file => {
	const imports = [];
	const ast = parse(file, babylonOptions);

	traverse(ast, {
		enter(path) {
			let name = null;
			if (t.isCallExpression(path.node) && get(path, 'node.callee.name') === 'require') {
				name = getRootDep(get(path, 'node.arguments[0].value'));
			}

			if (t.isImportDeclaration(path.node)) {
				name = getRootDep(get(path, 'node.source.value'));
			}

			if (isModule(name)) {
				imports.push(name);
			}

			return false;
		}
	});

	return uniq(imports);
};
