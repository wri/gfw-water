/*eslint-disable no-unused-expressions */
define(function (require) {

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var config = require('js/config');

  registerSuite({

    name: 'config.layersConfig',

    'each entry should contain a unique id property': function () {
      var ids = [];
      var layers = config.layersConfig;
      //- Push all the values into the ids array and assert they are not already present
      layers.forEach(function (layer) {
        expect(ids.indexOf(layer.id) === -1).to.be.ok;
        ids.push(layer.id);
      });
    },

    'each entry with a className should contain a unique className property': function () {
      var classes = [];
      var layers = config.layersConfig;
      //- Push all the values into the ids array and assert they are not already present
      layers.forEach(function (layer) {
        if (layer.className) {
          expect(classes.indexOf(layer.className) === -1).to.be.ok;
          classes.push(layer.id);
        }
      });
    },

    'each entry that has a type of dynamic must have layerIds': function () {
      var layers = config.layersConfig;
      layers.forEach(function (layer) {
        if (layer.type === 'dynamic' && !layer.disabled) {
          expect(layer.layerIds).to.be.instanceof(Array);
        }
      });
    },

    'each entry that has a url must have a type': function () {
      var layers = config.layersConfig;
      layers.forEach(function (layer) {
        if (layer.url) {
          expect(layer.type).to.exist;
        }
      });
    },

    'each entry that has a type that is not graphic must have a url': function () {
      var layers = config.layersConfig;
      layers.forEach(function (layer) {
        if (layer.type !== 'graphic' && !layer.disabled) {
          expect(layer.url).to.exist;
          expect(layer.url).to.have.length.above(0);
        }
      });
    }

  });

  registerSuite({

    name: 'config.layerInformation',

    'each entry should have title and table properties': function () {
      var layersInformation = config.layerInformation;
      for (var key in layersInformation) {
        expect(layersInformation[key].title).to.exist;
        expect(layersInformation[key].table).to.exist;
      }
    }

  });

});
