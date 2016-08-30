import path from 'path';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import nodeResolve from 'rollup-plugin-node-resolve';

const pkg = require('./package.json');

const external = Object.keys(pkg.dependencies);
external.push('lodash/fp');

export default {
	entry: path.resolve(__dirname, 'lib/index.js'),
	plugins: [
		babel(babelrc()),
		nodeResolve({
			jsnext: true,
			main: true,
		}),
	],
	external,
	targets: [
		{
			dest: path.resolve(__dirname, pkg.main),
			format: 'umd',
			moduleName: 'depensitor',
			sourceMap: true,
		},
		{
			dest: path.resolve(__dirname, pkg['jsnext:main']),
			format: 'es',
			sourceMap: true,
		},
	],
};
