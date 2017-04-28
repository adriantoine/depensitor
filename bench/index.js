require('babel-register');

const path = require('path');
const depensitor = require('../packages/depensitor/lib').default;
const packageDiff = require('../packages/depensitor/lib/package-diff').default;
const getFolderDependencies = require('../packages/depensitor/lib/get-folder-dependencies').default;
const Benchmark = require('benchmark');

new Benchmark('depensitor', {
	defer: true,
	fn: function(deferred) {
		depensitor({
			paths: ['./vue/**'],
			pkg: require('./vue/package'),
		}).then(() => deferred.resolve())
	},
}).on('complete', function() {
	console.log(this.toString());
}).run();

new Benchmark('package-diff', {
	fn: function() {
		const plugin1 = () => ({
			missing: ['dep-four', 'plugin1-missing'],
			unused: ['plugin1-unused'],
		});
		const plugin2 = () => ({
			missing: ['plugin2-missing'],
			unused: ['dep-five', 'plugin2-unused'],
		});

		packageDiff(
			['dep-one', 'dep-two', 'dep-four'],
			require('../packages/depensitor/lib/package-diff/__tests__/fixtures/package'),
			[plugin1, plugin2]
		);
	},
}).on('complete', function() {
	console.log(this.toString());
}).run();

new Benchmark('get-folder-dependencies', {
	defer: true,
	fn: function(deferred) {
		getFolderDependencies(
			[path.resolve(__dirname, 'vue/src/batcher'), path.resolve(__dirname, 'vue/src/cache'), path.resolve(__dirname, 'vue/src/directive')],
			[() => pause(1000)]
		).then(() => deferred.resolve())
	},
}).on('complete', function() {
	console.log(this.toString());
}).run();
