import {analysisPanelText} from 'js/config';
import Search from 'esri/dijit/Search';
import Symbols from 'helpers/Symbols';
import KEYS from 'js/constants';
import React from 'react';

let searchId = 'esri-search-widget';

let generateSearchWidget = () => {
  let searchWidget = new Search({
    map: app.map,
    autoNavigate: false,
    showInfoWindowOnSelect: false,
    allPlaceholder: analysisPanelText.searchAllPlaceholder
  }, searchId);
  let sources = searchWidget.get('sources');
  // Override the esri placeholder
  sources[0].placeholder = analysisPanelText.searchEsriPlaceholder;
  // Add some new sources so this widget can search across our feature layer
  sources.push({
    featureLayer: app.map.getLayer(KEYS.watershed),
    searchFields: ['maj_name'],
    displayField: 'maj_name',
    exactMatch: false,
    name: analysisPanelText.sourceName,
    enableSuggestions: true,
    minCharacters: 3,
    maxResults: 6,
    maxSuggestions: 6,
    highlightSymbol: Symbols.getWatershedHoverSymbol(),
    placeholder: analysisPanelText.searchWatershedPlaceholder
  });

  searchWidget.set('sources', sources);
  searchWidget.startup();

  searchWidget.on('select-result', evt => {
    if (evt.result) { app.map.setExtent(evt.result.extent, true); }
  });
};

export default class EsriSearch extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (!this.props.loaded && nextProps.loaded) {
      generateSearchWidget();
    }
  }

  render() {
    return (
      <div className='search-tools map-component side-shadow'>
        <div id={searchId} />
      </div>
    );
  }

}
