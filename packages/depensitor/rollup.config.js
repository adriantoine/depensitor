import path from 'path';
import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';

const pkg = require('./package.json');

const external = Object.keys(pkg.dependencies);

export default {
	entry: path.resolve(__dirname, 'src/index.js'),
	plugins: [
		buble(),
		nodeResolve(),
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
