module.exports = {
  author: 'WRI, BlueRaster',
  version: '{override in gulpfile.js from package.json}',
  esriVersion: '3.15',
  headerScriptProd: '//gfw-assets.s3.amazonaws.com/static/gfw-assets.latest.js',
  headerScriptStage: '//gfw-assets.s3.amazonaws.com/static/gfw-assets.nightly.js',
  home: {
    title: 'Explore the connections between forests and water - Global Forest Watch Water'
  },
  about: {
    title: 'Learn More - Global Forest Watch Water',
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
        'Publications',
        'Global Forest Watch Water Metadata Document',
        'This document explains the underlying science and assumptions of natural infrastructure for water, describes data layers and information, documents data sources, and details the methodology used to generate watershed risk scores in Global Forest Watch Water. All data and maps are publicly available.',
        'Blogs',
        'Learn the latest about natural infrastructure for water and Global Forest Watch Water'
      ],
      tutorials: [
        'Tutorials',
        'Global Forest Watch Water offers a wide range of content and capabilities to serve a variety of users and purposes. Whether you arrive at GFW Water with a clear purpose or are simply exploring different features, we can help you learn to use the platform.',
        'For more information, visit our How To page - ',
        'http://www.globalforestwatch.org/howto/tags/water/'
      ]
    }
  },
  map: {
    title: 'Interactive Map — Global Forest Watch Water'
  },
  partners: {
    title: 'Partners - Global Forest Watch Water',
    header: 'Partners',
    description: 'The World Resources Institute (WRI) is currently piloting the Global Forest Watch Water platform for use by civil society groups in India and Indonesia. Through the Small Grants Opportunity, WRI provides financial and technical support to use GFW Water to enrich ongoing forest restoration or watershed management research, advocacy, and fieldwork. GFW Water is generously supported by the Scherman Foundation Rosin Fund.',
    tableOne: {
      title: 'Small Grants projects in Indonesia.',
      headers: [
        'Organization',
        'Project',
        'Overview'
      ],
      rowOne: [
        'ECOTON',
        'Participatory Monitoring for a Healthy Brantas Watershed',
        'After decades of degradation in the Brantas River Basin West Java, Indonesia ECOTON will introduce the GFW Water mapping platform to the local community and collectively analyze the impact of sedimentation on the biotic community.  Through Focus Group Discussions, field visits, and building engagement with local community stakeholders, ECOTON will use the tools analytical features to enhance development of an action plan for participatory watershed restoration and conservation solutions. '
      ],
      rowTwo: [
        'Yayasan Mitra Insani',
        'Creating an Integrated Watershed Management Plan in Kampar',
        'The Kampar River basin is in the best condition of the four major watersheds in the province of Riau, Indonesia and holds special cultural significance for the people living around it.  This project will use the GFW Water platform to inform development of a stakeholder driven integrated watershed management plan that respects the local and cultural knowledge and preserves the current conditions in the face of growing oil palm plantation and other development threats.'
      ],
      rowThree: [
        'Hutan Riau',
        'Using Indigenous Knowledge along the Bio Watershed',
        'This project will identify problems and constraints related to the catchment area in the Bio Watershed including the Wildlife Reserves Bukit Rimbang Bulkit Baling (SM BRBB) along the Subayang and Bio rivers in Riau, Indonesia. '
      ]
    },
    tableTwo: {
      title: 'Small Grants projects in India.',
      headers: [
        'Organization',
        'Project',
        'Overview'
      ],
      rowOne: [
        'Ecological Society',
        'Prepare Floral Conservation and Restoration Plan for the Mayureshwar Wildlife Sanctuary (MWLS)',
        'MWLS is located in the eastern part of Pune District, Maharashtra.  The project will prepare a report of water use and availability in the area and prepare a plan for conservation and restoration of the flora in the MWLS.  This plan will be submitted to the State Forest Department for possible implementation.'
      ],
      rowTwo: [
        'Centre for Ecology Development and Research',
        'Assessing Water Catchment and Forest Cover of Aravailli Hills of Gurgaon and Faridabad to identify protection and restoration opportunities.',
        'The cities of Gurgaon and Faridabad are rapidly expanding urban metropolitan areas that border Delhi, putting enormous stress on the natural watershed area.  This project will identify the role of Aravalli hill catchments and forests that contribute to groundwater recharge and surface water runoff to local lakes, drying up in the area.  It will identify current and potential forest cover, the impacts of urbanization, and overlay administrative and tenure boundaries to enhance conservation and restoration proposals for this urban/peri-urban area.'
      ]
    }
  },
  unsupported: {
    title: 'Browser not supported | Global Forest Watch Water',
    message: 'This website is optimized for these browsers. Please upgrade to a supported browser and try loading the website again.',
    browsers: [
      {label: 'Chrome > 49', href: 'https://www.google.com/intl/en/chrome/browser/desktop/index.html'},
      {label: 'Firefox > 45', href: 'https://www.mozilla.org/en-US/firefox/all/'},
      {label: 'Safari > 8', href: 'http://www.apple.com/safari/'},
      {label: 'Internet Explorer 10', href: 'https://support.microsoft.com/en-us/help/18520/download-internet-explorer-11-offline-installer'}
    ]
  }
};
