module.exports = {
  author: 'WRI, BlueRaster',
  version: '{override in gulpfile.js from package.json}',
  esriVersion: '3.15',
  home: {
    title: 'Global Forest Watch Water'
  },
  map: {
    title: 'Map | Global Forest Watch Water'
  },
  unsupported: {
    title: 'Browser not supported | Global Forest Watch Water',
    message: 'This website is optimized for these browsers. Please upgrade to a supported browser and try loading the website again.',
    browsers: [
      {label: 'Chrome', href: 'https://www.google.com/intl/en/chrome/browser/desktop/index.html'},
      {label: 'Firefox', href: 'https://www.mozilla.org/en-US/firefox/all/'},
      {label: 'Safari', href: 'http://www.apple.com/safari/'},
      {label: 'Internet Explorer 10', href: 'https://support.microsoft.com/en-us/help/18520/download-internet-explorer-11-offline-installer'}
    ]
  }
};
