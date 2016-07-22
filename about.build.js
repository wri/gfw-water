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
		'babel-polyfill': 'vendor/browser-polyfill',
		'formsy-react': 'vendor/formsy-react/release/formsy-react',
		// Configured Packages
		'about': 'about/js',
		'js': './map/js',
		'vendor': 'vendor',
		'report': './report/js',
		'utils': './map/js/utils',
		'stores': './map/js/stores',
		'helpers': './map/js/helpers',
    'actions': './map/js/actions',
    'components': './map/js/components'
	},
	name: 'about/main',
	out: 'dist/about/js/main.js'
});
