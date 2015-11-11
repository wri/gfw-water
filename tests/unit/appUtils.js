/*eslint-disable no-unused-expressions */
define(function (require) {

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var appUtils = require('utils/AppUtils');

  var testArray = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 }
  ];

  registerSuite({

    name: 'appUtils.getObject',

    'Should retrieve object from the array': function () {
      var result = appUtils.getObject(testArray, 'id', 4);
      expect(result.id).to.equal(4);
    },

    'Should return undefined if the desired object is not in array': function () {
      var result = appUtils.getObject(testArray, 'id', 6);
      expect(result).to.not.be.ok;
    },

    'Should return undefined if the provided field is not in the objects in the array': function () {
      var result = appUtils.getObject(testArray, 'badId', 3);
      expect(result).to.not.be.ok;
    }

  });

  registerSuite({

    name: 'appUtils.validLatLng (-90, 90, -180, 180)',

    'Should return true if lat and lon is within global bounds': function () {
      expect(appUtils.validLatLng(45, 93)).to.be.ok;
      expect(appUtils.validLatLng(-45, -93)).to.be.ok;
    },

    'Should return false if lat or lon is not within global bounds': function () {
      expect(appUtils.validLatLng(45, 182)).to.not.be.ok;
      expect(appUtils.validLatLng(-92, 140)).to.not.be.ok;
      expect(appUtils.validLatLng(-93, -192)).to.not.be.ok;
    },

    'Should return false if either value is not provided': function () {
      expect(appUtils.validLatLng(-93)).to.not.be.ok;
      expect(appUtils.validLatLng(34)).to.not.be.ok;
      expect(appUtils.validLatLng(undefined, 34)).to.not.be.ok;
    }

  });

  registerSuite({

    name: 'appUtils.supportsExecCommand',

    'Should return a boolean': function () {
      expect(typeof appUtils.supportsExecCommand() === 'boolean').to.be.ok;
    }

  });

  registerSuite({

    name: 'appUtils.copySelectionFrom',

    'Should return a boolean': function () {
      expect(typeof appUtils.copySelectionFrom() === 'boolean').to.be.ok;
    }

  });

  registerSuite({

    name: 'appUtils.clone',

    'Should return a boolean': function () {
      var testObject = { foo: 'bar' };
      expect(appUtils.clone(testObject)).to.not.equal(testObject);
      expect(appUtils.clone(testObject).foo).to.equal('bar');
    }

  });


});
