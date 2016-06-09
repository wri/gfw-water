/*eslint-disable*/
({
	baseUrl: 'build/map',
	paths: {
		// Empty Modules/Aliases
		'dojo': 'empty:',
		'esri': 'empty:',
		'dijit': 'empty:',
		'dojox': 'empty:',
		// libs
    'alt': '../vendor/alt/dist/alt.min',
		'react': '../vendor/react/react.min',
		'react-dom': '../vendor/react/react-dom.min',
    'lodash': '../vendor/lodash/lodash.min',
		'babel-polyfill': '../vendor/browser-polyfill',
		'formsy-react': '../vendor/formsy-react/release/formsy-react',
		// Configured Packages
		'js': 'js',
		'vendor': '../vendor',
		'report': '../report/js',
		'utils': 'js/utils',
		'stores': 'js/stores',
		'helpers': 'js/helpers',
    'actions': 'js/actions',
    'components': 'js/components'
	},
	name: 'js/main',
	out: 'dist/map/js/main.js'
});
