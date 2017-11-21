import {analysisConfig, layersConfig, errors, queryConfig} from 'js/config';
import SpatialReference from 'esri/SpatialReference';
import GraphicsHelper from 'helpers/GraphicsHelper';
import GeoProcessor from 'esri/tasks/Geoprocessor';
import FeatureSet from 'esri/tasks/FeatureSet';
import QueryTask from 'esri/tasks/QueryTask';
import esriRequest from 'esri/request';
import Query from 'esri/tasks/query';
import Deferred from 'dojo/Deferred';
import utils from 'utils/AppUtils';
import KEYS from 'js/constants';

const request = {

  /**
  * @param {string} url - Url for an esri map service
  * @param {array} layerIds - An array of layer ids
  * @return {Deferred} deferred - A promise, will return either an array of layerInfos or an empty array
  */
  getLegendInfos: (url, layerIds) => {
    brApp.debug('Request >>> getLegendInfos');
    let deferred = new Deferred();

    esriRequest({
      url: `${url}/legend`,
      handleAs: 'json',
      callbackParamName: 'callback',
      content: { f: 'json' }
    }).then(res => {
      if (res && res.layers && res.layers.length > 0) {
        let layers = res.layers.filter(layer => layerIds.indexOf(layer.layerId) > -1);
        let legendInfos = layers.length === 1 ? layers[0].legend : layers.map(layer => layer.legend);
        deferred.resolve(legendInfos || []);
      }
    }, err => {
      console.error(err);
      deferred.resolve([]);
    });

    return deferred;
  },

  /**
  * @param {Point} geometry - Esri Point geometry to use as a query for a feature on the watershed service
  * @return {Deferred} deferred
  */
  getWatershedByGeometry: geometry => {
    brApp.debug('Request >>> getWatershedByGeometry');
    let config = utils.getObject(layersConfig, 'id', KEYS.watershed);
    let task = new QueryTask(config.url);
    let deferred = new Deferred();
    let query = new Query();

    query.returnGeometry = true;
    query.geometry = geometry;
    query.outFields = ['*'];
    query.distance = queryConfig.distance;
    query.units = queryConfig.units;

    task.execute(query, results => {
      if (results.features.length > 0) {
        deferred.resolve(results.features[0]);
      } else {
        deferred.reject(errors.featureNotFound);
      }
    }, deferred.reject);

    return deferred;
  },

  /**
  * @param {string} objectid - Objectid for a feature on the watershed service
  * @return {Deferred} deferred
  */
  getWatershedById: objectid => {
    brApp.debug('Request >>> getWatershedById');
    let config = utils.getObject(layersConfig, 'id', KEYS.watershed);
    let deferred = new Deferred();
    let content = {
      objectIds: [objectid],
      returnGeometry: true,
      outFields: ['*'],
      f: 'json'
    };

    esriRequest({
      url: `${config.url}/query`,
      handleAs: 'json',
      callbackParamName: 'callback',
      content: content
    }).then(response => {
      let {features} = response;
      if (features.length === 1) {
        deferred.resolve(features[0]);
      } else {
        deferred.reject(errors.featureNotFound);
      }
    }, deferred.reject);

    return deferred;
  },

  /**
  * Get Upstream Analysis
  * @param {object} - Valid esri geometry
  * @return {Deferred} - promise
  */
  getUpstreamAnalysis: geometry => {
    brApp.debug('Request >>> getUpstreamAnalysis');
    let {url, params, outputSR} = analysisConfig.upstream;
    let geoprocessor = new GeoProcessor(url);
    let deferred = new Deferred();
    let pointGraphic = GraphicsHelper.makePoint(geometry);
    let features = [];
    let featureSet = new FeatureSet();

    geoprocessor.setOutputSpatialReference(new SpatialReference(outputSR));
    features.push(pointGraphic);
    featureSet.features = features;
    params.InputPoints = featureSet;

      esriRequest({
        url: `https://hbod098di4.execute-api.us-east-1.amazonaws.com/v1/gettoken?referrer=water-staging.globalforestwatch.org`
      }).then(response => {
        const token = response.token;
        params.token = token;
        esriRequest({
          url: 'http://hydro.arcgis.com/arcgis/rest/services/Tools/Hydrology/GPServer/Watershed/submitJob',
          handleAs: 'json',
          callbackParamName: 'callback',
          content: params
        }).then(submitJobResponse => {
          const timer = setInterval(() => {
            esriRequest({
              url: `http://hydro.arcgis.com/arcgis/rest/services/Tools/Hydrology/GPServer/Watershed/jobs/${submitJobResponse.jobId}`,
              callbackParamName: 'callback',
              content: { token: token, f: 'json' }
            }).then(jobsResponse => {
              if (jobsResponse.jobStatus === 'esriJobSucceeded') clearInterval(timer);
              if (jobsResponse.jobStatus === 'esriJobFailed') {
                clearInterval(timer);
                deferred.reject();
              }
              esriRequest({
                url: `http://hydro.arcgis.com/arcgis/rest/services/Tools/Hydrology/GPServer/Watershed/jobs/${submitJobResponse.jobId}/results/WatershedArea?f=json&returnType=data`,
                callbackParamName: 'callback',
                content: {token: token}
              }).then(watershedAreaResponse => {
                deferred.resolve(watershedAreaResponse.value);
              });
              // geoprocessor.getResultData(submitJobResponse.jobId, jobId, data => {
              //   console.log('data', data);
              //   deferred.resolve(data.value);
              // }, deferred.reject);
            }, deferred.reject);
          }, 1000);
        });
      });

      // esriRequest.setRequestPreCallback((reqArgs) => {
      //   console.log(reqArgs);
      //   if (reqArgs.url.indexOf('http://hydro.arcgis.com/arcgis/rest/services/Tools/Hydrology/GPServer/Watershed/jobs') > -1) {
      //     reqArgs.content = reqArgs.content || {};
      //     reqArgs.content.token = res.token;
      //   }

      //   return reqArgs;
      // });

      // geoprocessor.submitJob(params, results => {
      //   console.log(results.jobId);
      //   console.log(jobId);
      //   geoprocessor.getResultData(results.jobId, jobId, data => {
      //     console.log('data', data);
      //     deferred.resolve(data.value);
      //   }, deferred.reject);
      // }, () => {
      //   // status callback, put console.debug(arguments) if needed
      // }, deferred.reject);
    // }, err => {
    //   console.log(err);
    // });

    return deferred;
  }

};

export {request as default};
