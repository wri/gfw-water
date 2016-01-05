import {prepareStateForUrl} from 'helpers/ShareHelper';
import {modalActions} from 'actions/ModalActions';
import LayersHelper from 'helpers/LayersHelper';
import {mapActions} from 'actions/MapActions';
import {controlPanelText} from 'js/config';
import {mapStore} from 'stores/MapStore';
import KEYS from 'js/constants';
import React from 'react';

let zoomInSvg = '<use xlink:href="#icon-plus" />';
let zoomOutSvg = '<use xlink:href="#icon-minus" />';
let shareSvg = '<use xlink:href="#icon-share" />';
let toggleSvgOff = '<use xlink:href="#icon-controlstoggle__off" />';
let toggleSvgOn = '<use xlink:href="#icon-controlstoggle__on" />';
let basemapSvg = '<use xlink:href="#icon-basemap" />';
let locateSvg = '<use xlink:href="#icon-locate" />';

export default class ControlPanel extends React.Component {

  constructor (props) {
    super(props);
    mapStore.listen(this.storeUpdated.bind(this));
    this.state = mapStore.getState();
  }

  storeUpdated () {
    let newState = mapStore.getState();
    this.setState(newState);
    // If the basemap entry in the store changed, update it on the map now
    if (newState.activeBasemap !== this.state.activeBasemap) {
      LayersHelper.changeBasemap(newState.activeBasemap);
    }

    // If the label layer in the store changed, update it on the map now
    if (newState.activeLabelLayer !== this.state.activeLabelLayer) {
      LayersHelper.updateLabelLayers(newState.activeLabelLayer);
    }
  }

  render() {
    return (
      <div className='control-panel map-component shadow'>
        <ul>
          <li className='zoom-in pointer' title='Zoom In' onClick={this.zoomIn}>
            <svg className='panel-icon' dangerouslySetInnerHTML={{ __html: zoomInSvg }}/>
          </li>
          <li className='zoom-out pointer' title='Zoom Out' onClick={this.zoomOut}>
            <svg className='panel-icon' dangerouslySetInnerHTML={{ __html: zoomOutSvg }}/>
          </li>
          <li className='share-map pointer' title='Share' onClick={this.share}>
            <svg className='panel-icon' dangerouslySetInnerHTML={{ __html: shareSvg }}/>
          </li>
          <li className={`hide-controls pointer${!this.state.controlsVisible ? ' hide-controls--on' : ''}`} title='Reset' onClick={::this.toggleControls}>
            <svg className='panel-icon' dangerouslySetInnerHTML={{ __html: (this.state.controlsVisible ? toggleSvgOff : toggleSvgOn) }}/>
          </li>
          <li className='basemap-layers pointer' title='Basemaps' onClick={::this.toggleBasemapGallery}>
            <svg className='panel-icon' dangerouslySetInnerHTML={{ __html: basemapSvg }}/>
          </li>
          <li className='locate-me pointer' title='Locate Me' onClick={this.locateMe}>
            <svg className='panel-icon' dangerouslySetInnerHTML={{ __html: locateSvg }}/>
          </li>
        </ul>
        <div className={'basemap-switcher shadow' + (this.state.basemapGalleryOpen ? ' open' : '')}>
          <div className='basemap-item basemap-item__label-layer-picker'>
            <div className='basemap-item__label-layer-picker__header'>Label Layers:</div>
            <label className='pointer'>
              <input checked={KEYS.rivers === this.state.activeLabelLayer}
                type='radio'
                name='label-layer'
                onChange={this.changeLabelLayer.bind(this, KEYS.rivers)}
              />
              {controlPanelText.hydrologyLabel}
            </label>
            <label className='pointer'>
              <input checked={KEYS.adminLabels === this.state.activeLabelLayer}
                type='radio'
                name='label-layer'
                onChange={this.changeLabelLayer.bind(this, KEYS.adminLabels)}
              />
              {controlPanelText.administrativeLabel}
            </label>
          </div>
          <div className='basemap-item pointer' onClick={this.clickedBasemap.bind(this, KEYS.wriBasemap)}>
            <div className={'basemap-thumbnail wri-basemap' + (this.state.activeBasemap === KEYS.wriBasemap ? ' active' : '')} />
            <div className='basemap-label'>{controlPanelText.wriBasemap}</div>
          </div>
          <div className='basemap-item pointer' onClick={this.clickedBasemap.bind(this, KEYS.imageryBasemap)}>
            <div className={'basemap-thumbnail imagery-basemap' + (this.state.activeBasemap === KEYS.imageryBasemap ? ' active' : '')} />
            <div className='basemap-label'>{controlPanelText.imageryBasemap}</div>
          </div>
        </div>
      </div>
    );
  }

  zoomIn () {
    brApp.map.setZoom(brApp.map.getZoom() + 1);
  }

  zoomOut () {
    brApp.map.setZoom(brApp.map.getZoom() - 1);
  }

  share () {
    modalActions.showShareModal(prepareStateForUrl());
  }

  toggleControls () {
    mapActions.toggleControls(!this.state.controlsVisible);
  }

  toggleBasemapGallery () {
    mapActions.toggleBasemapGallery(!this.state.basemapGalleryOpen);
  }

  clickedBasemap (id) {
    mapActions.setBasemap(id);
  }

  locateMe () {
    mapActions.zoomToUserLocation();
  }

  changeLabelLayer (layerId) {
    mapActions.setLabelLayer(layerId);
  }

}
