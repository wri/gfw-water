module.exports = {
  author: 'WRI, BlueRaster',
  version: '{override in gulpfile.js from package.json}',
  esriVersion: '3.15',
  home: {
    title: 'Global Forest Watch Water'
  },
  about: {
    title: 'Learn More | Global Forest Watch Water',
    header: 'Learn More',
    description: 'Global Forest Watch Water (GFW Water) joins the Global Forest Watch suite of interactive online forest monitoring tools designed to empower people everywhere with the information they need to better manage and conserve forest landscapes. GFW Water provides powerful information to help catalyze a global movement to enhance water security and bolster economic development through natural infrastructure.',
    content: {
      about: [
        'About GFW Water',
        'Global Forest Watch Water is a publicly available global database and interactive mapping tool designed to help users find decision-relevant information on natural infrastructure to enhance water security.',
        'GFW Water allows anyone with internet access to visualize critical watershed related information, identify threats to watershed health, and screen for cost-effective, sustainable natural infrastructure solutions based on watershed characteristics and risk profiles. ',
        'GFW Water provides spatial data sets, summary statistics, and watershed risk scores for watersheds around the globe. Users can also locate and delineate customized subwatersheds for analysis. GFW Water serves as a portal to WRI’s decision-support resources for planning natural infrastructure initiatives, including tools, guidelines, and case studies.'
      ],
      numbers: {
        title: 'Plan For Action',
        header: 'Recommended Natural Infrastructure Strategies',
        intro: 'Risks scores of 4 or higher should be addressed by specific actions. Highlighted is the list of recommendations and case studies to mitigate high risks to this watershed.',
        table: {
          headers: [
            'Risk',
            'Strategies',
            'Examples',
            'Case Studies'
          ],
          rowOne: [
            'Recent Tree Cover Loss',
            'Ecosystem Protection',
            {
              openingOne: 'Conservation zones: ',
              closingOne: 'Setting aside natural areas with high conservation value to preserve biodiversity and maintain forests, wetlands, and other open lands as natural infrastructure to regulate water flow and improve quality',
              openingTwo: 'Sustainable forestry: ',
              closingTwo: 'Engaging in best forestry practices to minimize negative environmental impacts and disturbance to forests to deliver critical watershed services such as water purification and flood mitigation',
              openingThree: 'Road network regulation: ',
              closingThree: 'Limiting road creation near vulnerable forests, which has been heavily linked to deforestation that diminishes forests’ ability to regulate flow and purify water'
            },
            'Case Studies'
          ],
          rowTwo: [
            'Historical Tree Cover Loss',
            'Landscape Restoration',
            {
              openingOne: 'Reforestation: ',
              closingOne: 'Planting seedlings in burnt or deforested areas to stem the rate of erosion and restore the land',
              openingTwo: 'Assisted natural regeneration: ',
              closingTwo: 'Enhancing the establishment of secondary forest from degraded grassland and shrub vegetation by protecting and nurturing the mother trees and their wildlings inherently present in the area which may enhance aquifer recharge',
              openingThree: 'Agroforestry: ',
              closingThree: 'Managing forests together with crops and/or animal production systems in agricultural settings'
            }
          ],
          rowThree: [
            'Erosion',
            'Erosion Control',
            {
              openingOne: 'Vegetation buffering: ',
              closingOne: 'Planting or maintaining trees/ shrubs along the sides of roads and waterways to capture runoff and pollutants',
              openingTwo: 'Slope erosion reduction: ',
              closingTwo: 'Slowing the rate of erosion on steep sloped lands by creating various barriers to sediment movement. Examples include contour felling of trees, silt fences, and terracing',
              openingThree: 'Agricultural best management practices: ',
              closingThree: 'Reducing the amount of pesticides, fertilizers, animal waste, and other pollutants entering water resources, and conserving water supply. Examples include contour farming, cover crops, and terrace construction'
            }
          ],
          rowFour: [
            'Fire',
            'Fire Management',
            {
              openingOne: 'Forest fuel reduction: ',
              closingOne: 'Reducing wildfire severity and related sediment and ash pollution through controlled burns and mechanical treatment'
            }
          ]
        }
      },
      publications: [
        'Publication',
        'Global Forest Watch Water Metadata Document',
        'This document explains the underlying science and assumptions of natural infrastructure for water, describes data layers and information, documents data sources, and details the methodology used to generate watershed risk scores in Global Forest Watch Water. All data and maps are publicly available.',
        'Blogs',
        'Learn the latest about natural infrastructure for water and Global Forest Watch Water'
      ],
      tutorials: [
        'Tutorials',
        'Global Forest Watch Water offers a wide range of content and capabilities to serve a variety of users and purposes. Whether you arrive at GFW Water with a clear purpose or are simply exploring different features, we can help you learn to use the platform.'
      ],
    }
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
