/*eslint-disable*/
({
	baseUrl: 'build',
	paths: {
    // Empty Modules/Aliases
		'dojo': 'empty:',
		'esri': 'empty:',
		'dijit': 'empty:',
		'dojox': 'empty:',
		// libs
    'alt': 'vendor/alt/dist/alt.min',
		'react': 'vendor/react/react.min',
    'lodash': 'vendor/lodash/lodash.min',
		'babel-polyfill': 'vendor/browser-polyfill',
		// Configured Packages
		'js': 'js/report',
		'vendor': 'vendor',
    'utils': 'js/map/utils',
    'stores': 'js/map/stores',
    'helpers': 'js/map/helpers',
    'actions': 'js/map/actions',
    'components': 'js/map/components'
	},
	name: 'js/main',
	out: 'dist/js/report/main.js',
});