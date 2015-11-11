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

    name: 'config functions',

    'should return a string with the provided text embedded into the share url': function () {
      var shareConfig = config.modalText.share;

      expect(shareConfig.facebookUrl('testing')).to.contain('testing').and.to.contain('facebook.com');
      expect(shareConfig.twitterUrl('testing')).to.contain('testing').and.to.contain('twitter.com');
      expect(shareConfig.googleUrl('testing')).to.contain('testing').and.to.contain('google.com');
    },

    'should return a descriptive error message containing the provided text': function () {
      var errors = config.errors;

      expect(errors.incorrectLayerConfig('testing')).to.contain('testing');
      expect(errors.geolocationFailure('testing')).to.contain('testing');
    },

    'should return a name of the feature from attributes.maj_name or a string description, no null or undefined': function () {
      var analysisPanelConfig = config.analysisPanelText;

      expect(analysisPanelConfig.getWatershedTitle({
        attributes: { maj_name: 'Testing' }
      })).to.equal('Testing');

      expect(analysisPanelConfig.getWatershedTitle({
        attrs: { maj_name: 'Testing' }
      })).to.be.an('string').and.not.to.equal('Testing');
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
