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
		'react-dom': 'vendor/react/react-dom.min',
    'lodash': 'vendor/lodash/lodash.min',
    'babel-polyfill': 'vendor/babel-polyfill/browser-polyfill',
		'FileSaver': 'vendor/file-saver/FileSaver.min',
		// Configured Packages
		'js': 'map/js',
		'report': 'report/js',
		'vendor': 'vendor',
    'utils': 'map/js/utils',
    'stores': 'map/js/stores',
    'helpers': 'map/js/helpers',
    'actions': 'map/js/actions',
    'components': 'map/js/components'
	},
	name: 'report/main',
	out: 'dist/report/js/main.js',
});
