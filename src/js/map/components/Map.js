import AnalysisTools from 'components/AnalysisPanel/AnalysisTools';
import EsriSearch from 'components/AnalysisPanel/EsriSearch';
import ControlPanel from 'components/MapControls/ControlPanel';
import LayerPanel from 'components/LayerPanel/LayerPanel';
import {mapActions} from 'actions/MapActions';
import {mapConfig} from 'js/config';
import React from 'react';

export default class Map extends React.Component {

  constructor (props) {
    super(props);
    this.state = { loaded: false };
  }

  componentDidMount() {
    mapActions.createMap(mapConfig).then(() => {
      this.setState({ loaded: true });
      mapActions.createLayers();
    });
  }

  render () {
    return (
      <div id={mapConfig.id} className={'map' + (this.state.loaded ? '' : ' invisible')}>
        <div className='gfw-water-logo' />
        <div className='aqueduct-logo' />
        <LayerPanel loaded={this.state.loaded} />
        <ControlPanel />
        <EsriSearch loaded={this.state.loaded} />
        <AnalysisTools />
      </div>
    );
  }

}
