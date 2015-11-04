/*eslint-disable*/
({
	baseUrl: 'build',
	paths: {
		// libs
    'alt': 'vendor/alt/dist/alt.min',
		'react': 'vendor/react/react.min',
    'lodash': 'vendor/lodash/lodash.min',
		'babel-polyfill': 'vendor/browser-polyfill',
		// Configured Packages
		'js': 'js/home',
		'vendor': 'vendor',
	},
	name: 'js/main',
	out: 'dist/js/home/main.js',
	insertRequire: ['js/main']
});
