import AnalysisTools from 'components/AnalysisPanel/AnalysisTools';
import MobileControls from 'components/MapControls/MobileControls';
import EsriSearch from 'components/AnalysisPanel/EsriSearch';
import ControlPanel from 'components/MapControls/ControlPanel';
import LayerPanel from 'components/LayerPanel/LayerPanel';
import {applyStateFromUrl} from 'helpers/ShareHelper';
import LayersHelper from 'helpers/LayersHelper';
import {mapActions} from 'actions/MapActions';
import Scalebar from 'esri/dijit/Scalebar';
import {mapConfig, links} from 'js/config';
import {getUrlParams} from 'utils/params';
import Loader from 'components/Loader';
import React from 'react';

export default class Map extends React.Component {

  constructor (props) {
    super(props);
    this.state = { loaded: false };
  }

  componentDidMount() {
    let urlParams = getUrlParams(location.search);
    //- Mixin the map config with the url params, make sure to create a new object and not
    //- overwrite the mapConfig, again so reset sets the state back to default and not shared,

    mapActions.createMap(mapConfig).then(() => {
      this.setState({ loaded: true });
      mapActions.createLayers().then(() => {
        LayersHelper.connectLayerEvents();
      });
      //- Use the helper to take the params and use actions to apply shared state, don't set these params
      //- as default state, otherwise the reset button will reset to shared state and not default state
      applyStateFromUrl(urlParams);

      //- Add a scalebar
      /* eslint no-unused-vars: 0 */
      const scalebar = new Scalebar({ map: brApp.map, scalebarUnit: 'metric' }, this.refs.scalebar);
      /* eslint no-unused-vars: 0 */
    });
  }

  render () {
    return (
      <div id={mapConfig.id} className={'map'}>

        <Loader active={!this.state.loaded} />
        <a href={links.home.url} title={links.home.title} alt={links.home.title}><div className='gfw-water-logo' /></a>
        <a href={links.aqueduct.url} title={links.aqueduct.title} alt={links.aqueduct.title} target='_blank'><div className='aqueduct-logo' /></a>
        <LayerPanel loaded={this.state.loaded} />
        <ControlPanel />
        <EsriSearch loaded={this.state.loaded} />
        <AnalysisTools />
        <MobileControls />
        <div ref='scalebar' />
      </div>
    );
  }

}
