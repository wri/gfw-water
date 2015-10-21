import {layerActions} from 'actions/LayerActions';
import {mapActions} from 'actions/MapActions';
import {layerPanelText} from 'js/config';
import KEYS from 'js/constants';
import alt from 'js/alt';

class MapStore {

  constructor () {
    this.activeLayers = [];
    this.activeBasemap = KEYS.wriBasemap;
    this.firesSelectIndex = layerPanelText.firesOptions.length - 1;
    this.lossFromSelectIndex = 0;
    this.lossToSelectIndex = layerPanelText.lossOptions.length - 1;

    this.bindListeners({
      setBasemap: mapActions.setBasemap,
      addActiveLayer: layerActions.addActiveLayer,
      removeActiveLayer: layerActions.removeActiveLayer,
      changeFiresTimeline: layerActions.changeFiresTimeline,
      changeLossToTimeline: layerActions.changeLossToTimeline,
      changeLossFromTimeline: layerActions.changeLossFromTimeline
    });
  }

  addActiveLayer (layerId) {
    let index = this.activeLayers.indexOf(layerId);
    if (index === -1) {
      // Create a copy of the strings array for easy change detection
      let layers = this.activeLayers.slice();
      layers.push(layerId);
      this.activeLayers = layers;
    }
  }

  removeActiveLayer (layerId) {
    let index = this.activeLayers.indexOf(layerId);
    if (index !== -1) {
      // Create a copy of the strings array for easy change detection
      let layers = this.activeLayers.slice();
      layers.splice(index, 1);
      this.activeLayers = layers;
    }
  }

  setBasemap (basemap) {
    this.activeBasemap = basemap;
  }

  showLayerInfo (layerInfo) {
    this.modalLayerInfo = layerInfo;
  }

  changeFiresTimeline (activeIndex) {
    this.firesSelectIndex = activeIndex;
  }

  changeLossFromTimeline (activeIndex) {
    this.lossFromSelectIndex = activeIndex;
  }

  changeLossToTimeline (activeIndex) {
    this.lossToSelectIndex = activeIndex;
  }

}

export const mapStore = alt.createStore(MapStore);
