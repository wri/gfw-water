import AboutModal from 'components/Modals/AboutModal';
import {modalActions} from 'actions/ModalActions';
// import babelPolyfill from 'babel-polyfill';
import ReactDOM from 'react-dom';
import React from 'react';
import hash from 'dojo/hash';

// if (!babelPolyfill) { console.log('Missing Babel Polyfill.  May experience some weirdness in IE < 9.'); }

// Set up globals
window.brApp = {
  debugEnabled: true,
  highchartsLoaded: false,
  highchartsPromise: false,
  debug: function (message) {
    if (this.debugEnabled) {
      var print = typeof message === 'string' ? console.log : console.dir;
      print.apply(console, [message]);
    }
  }
};

// Shim for rAF with timeout for callback
window.requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) { window.setTimeout(callback, 1000 / 60); };
})();

const toQuery = (json, noEncode) => {
  let errorMsg = 'You should not be converting nested objects as they wont encode properly. Try making it a string first.';
  let result = [];
  for (let key in json) {
    if (Object.prototype.toString.call(json[key]) === '[object Object]') {
      throw new Error(errorMsg);
    }
    if (noEncode) {
      result.push(`${key}=${json[key]}`);
    } else {
      result.push(`${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`);
    }
  }
  return result.join('&');
};

const toObject = (querystring) => {
  if (!querystring) { return {}; }
  let result = {};
  let pairs = querystring.split('&').map((item) => {
    return item.split('=').map(str => decodeURIComponent(str));
  });

  pairs.forEach((pair) => {
    if (!pair[0] || !pair[1]) {
      console.warn(`You provided an invalid key-value pair, ${pair[0]} is being omitted.`);
      return;
    }
    result[pair[0]] = pair[1];
  });
  return result;
};

const getUrlParams = (path) => {
  if (!path) { return {}; }
  let bits = path.split('#');
  let querystring = bits.length > 1 ? bits[1] : '';
  return toObject(querystring);
};

const applyStateFromUrl = (state) => {
  var menuItems = [].slice.call(document.querySelectorAll('#menu li'));

  menuItems.forEach(function (menu) {
    menu.classList.remove('active');
  });

  let activeElement = document.getElementById(state.about);

  if (activeElement) {
    activeElement.classList.add('active');
    let index;

    switch (activeElement.id) {
      case 'water':
        index = 0;
        break;
      case 'numbers':
        index = 1;
        break;
      case 'publications':
        index = 2;
        break;
      case 'tutorials':
        index = 3;
        break;
      default:
        break;
    }

    var links = [
      'one',
      'two',
      'three',
      'four'
    ];

    links.forEach(function (link) {
      document.getElementById(link).className = document.getElementById(link).className.replace('active', '');
    });
    var element = document.getElementById(links[index]);

    element.className = element.className + ' active';
  }

};

const attachEvents = () => {

  let cards = document.getElementsByClassName('little-card');
  Array.prototype.forEach.call(cards, elem => {
    elem.addEventListener('click', evt => {
      let card = evt.currentTarget.id;
      console.log(card);
      modalActions.showAboutModal(card);
    });
  });

  var links = [
    'one',
    'two',
    'three',
    'four'
  ];
  var menuItems = [].slice.call(document.querySelectorAll('#menu li'));

  menuItems.forEach(function (item, index) {
    item.onclick = function () {

      menuItems.forEach(function (menu) {
        menu.classList.remove('active');
      });

      this.classList.add('active');

      links.forEach(function (link) {
        document.getElementById(link).className = document.getElementById(link).className.replace('active', '');
      });
      var element = document.getElementById(links[index]);
      element.className = element.className + ' active';

      let shareObject = {
        about: this.id
      };

      var url = toQuery(shareObject);

      hash(url);
    };
  });

};

attachEvents();
let params = getUrlParams(location.hash);
applyStateFromUrl(params);
ReactDOM.render(<AboutModal />, document.getElementById('about-modal'));
