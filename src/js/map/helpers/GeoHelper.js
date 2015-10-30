import {mapConfig} from 'js/config';
import Deferred from 'dojo/Deferred';
import Point from 'esri/geometry/Point';
import SpatialReference from 'esri/SpatialReference';
import GeometryService from 'esri/tasks/GeometryService';
import webMercatorUtils from 'esri/geometry/webMercatorUtils';

export default class GeoHelper = {

  constructor () {
    this.geometryService = null
    this.spatialReference = null
  }

  getSpatialReference () {
    return this.spatialReference = this.spatialReference || new SpatialReference(102100);
  }

  getGeometryService () {
    return this.geometryService = this.geometryService || new GeometryService(mapConfig.geometryServiceUrl);
  }

  union (polygons) {
    if (Object.prototype.toString.call(polygons) !== '[object Array]') {
      throw new Error('Method expects polygons paramter to be of type Array');
    }

    let deferred = new Deferred(),
        geometryService = this.getGeometryService();

    if (polygons.length === 1) {
      deferred.resolve(polygons[0]);
    } else {
      geometryService.union(polygons, deferred.resolve, deferred.resolve);
    }
    return deferred;
  }

  convertGeometryToGeometric (geometry) {
    var geometryArray = [],
        newRings = [],
        lngLat,
        point;

    // Helper function to determine if the coordinate is already in the array
    // This signifies the completion of a ring and means I need to reset the newRings
    // and start adding coordinates to the new newRings array
    function sameCoords(arr, coords) {
        var result = false;
        arrayUtils.forEach(arr, function(item) {
            if (item[0] === coords[0] && item[1] === coords[1]) {
                result = true;
            }
        });
        return result;
    }

    geometry.rings.forEach(function(ringers) {
        ringers.forEach(function(ring) {
            point = new Point(ring, this.getSpatialReference());
            lngLat = webMercatorUtils.xyToLngLat(point.x, point.y);
            if (sameCoords(newRings, lngLat)) {
                newRings.push(lngLat);
                geometryArray.push(newRings);
                newRings = [];
            } else {
                newRings.push(lngLat);
            }
        });
    });

    //arrayUtils.forEach(geometry.rings, function(ringers) {
    //    arrayUtils.forEach(ringers, function(ring) {
    //        point = new Point(ring, self.getSpatialReference());
    //        lngLat = webMercatorUtils.xyToLngLat(point.x, point.y);
    //        if (sameCoords(newRings, lngLat)) {
    //            newRings.push(lngLat);
    //            geometryArray.push(newRings);
    //            newRings = [];
    //        } else {
    //            newRings.push(lngLat);
    //        }
    //    });
    //});

    return {
        geom: geometryArray.length > 1 ? geometryArray : geometryArray[0],
        type: geometryArray.length > 1 ? "MultiPolygon" : "Polygon"
    };
  }
};

