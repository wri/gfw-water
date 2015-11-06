/*eslint-disable no-unused-expressions */
define(function (require) {

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var params = require('utils/params');

  var objects = {
    A: { foo: 'bar', bar: 'baz', scooby: 'doo' },
    B: { url: 'http://www.google.com', value: '20%' },
    C: { url: 'http://www.google.com', value: '20%' },
    D: { key: 'value', nested: { 'expected': 'toFail' }}
  };

  var strings = {
    A: 'foo=bar&bar=baz&scooby=doo',
    B: 'url=http%3A%2F%2Fwww.google.com&value=20%25',
    C: 'url=http://www.google.com&value=20%',
    toQueryError: 'You should not be converting nested objects as they wont encode properly. Try making it a string first.',
    invalidQuery: 'key=&some=&foo=bar',
    url: 'http://www.google.com?foo=bar&bar=baz&scooby=doo'
  };

  registerSuite({

    name: 'params.toObject',

    'should convert a string to a JSON object with the correct keys': function () {
      var result = params.toObject(strings.A);
      expect(result.foo).to.equal(objects.A.foo);
      expect(result.bar).to.equal(objects.A.bar);
      expect(result.scooby).to.equal(objects.A.scooby);
    },

    'should decode all values in the returned JSON object': function () {
      var result = params.toObject(strings.B);
      expect(result.url).to.equal(objects.B.url);
      expect(result.value).to.equal(objects.B.value);
    },

    'should leave an invalid key-value pair out': function () {
      var result = params.toObject(strings.invalidQuery);
      expect(result.foo).to.equal('bar');
      expect(result.key).to.not.exist;
      expect(result.some).to.not.exist;
    }

  });

  registerSuite({

    name: 'params.toQuery',

    'should flatten a JSON object and return a string with the correct key value mapping': function () {
      var result = params.toQuery(objects.A);
      expect(result).to.equal(strings.A);
    },

    'should encode all values from the given object in the returned string': function () {
      var result = params.toQuery(objects.B);
      expect(result).to.equal(strings.B);
    },

    'should not encode any values if instructed to': function () {
      var result = params.toQuery(objects.C, true);
      expect(result).to.equal(strings.C);
    },

    'should throw an error if passed a nested javascript object': function () {
      expect(function () {
        params.toQuery(objects.D);
      }).to.throw(strings.toQueryError);
    }

  });

  registerSuite({

    name: 'params.getUrlParams',

    'should return an empty object if no path is provided': function () {
      var result = params.getUrlParams();
      expect(result).to.be.an('object');
    },

    'should return a dictionary matching keys and values in the provided path': function () {
      var result = params.getUrlParams(strings.url);
      expect(result.foo).to.equal(objects.A.foo);
      expect(result.bar).to.equal(objects.A.bar);
      expect(result.scooby).to.equal(objects.A.scooby);
    }

  });

});
