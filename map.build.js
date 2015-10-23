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
		'formsy-react': 'vendor/formsy-react/release/formsy-react',
		// Configured Packages
		'js': 'js/map',
		'vendor': 'vendor',
		'utils': 'js/map/utils',
		'stores': 'js/map/stores',
		'helpers': 'js/map/helpers',
    'actions': 'js/map/actions',
    'components': 'js/map/components'
	},
	name: 'js/main',
	out: 'dist/js/map/main.js'
});
