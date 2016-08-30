require('babel-register');

// const Benchmark = require('benchmark')
// const getFolderDependencies = require('./getFolderDependencies').default

// new Benchmark('Small Folder', {
//   defer: true,
//   fn: function(deferred) {
//     getFolderDependencies([
//       'getFileDependencies/__tests__/fixtures',
//     ]).then(() => deferred.resolve())
//   },
// }).on('cycle', function(event) { console.log(String(event.target)) }).run()

// new Benchmark('Big Folder', {
//   defer: true,
//   fn: function(deferred) {
//     getFolderDependencies([
//       '../dev-setup/tray/src/github.com/trayio/frontend-apps/builder/**/*.js',
//       '../dev-setup/tray/src/github.com/trayio/frontend-apps/website/**/*.js',
//     ]).then(() => deferred.resolve())
//   },
// }).on('cycle', function(event) { console.log(String(event.target)) }).run()

require('./packages/depensitor/lib').default({
	paths: [
		'../dev-setup/tray/src/github.com/trayio/frontend-apps/builder/**/*.js',
		'../dev-setup/tray/src/github.com/trayio/frontend-apps/website/**/*.js',
		'../dev-setup/tray/src/github.com/trayio/frontend-apps/shared/**/*.js',
		'../dev-setup/tray/src/github.com/trayio/frontend-apps/.storybook/**/*.js',
		'../dev-setup/tray/src/github.com/trayio/frontend-apps/webpack/**/*.js',
	],
	pkg: require('../dev-setup/tray/src/github.com/trayio/frontend-apps/package'),
}).then(val => console.log(val));
