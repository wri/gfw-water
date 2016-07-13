import AboutModal from 'components/Modals/AboutModal';
import {modalActions} from 'actions/ModalActions';
import babelPolyfill from 'babel-polyfill';
import ReactDOM from 'react-dom';
import React from 'react';

if (!babelPolyfill) { console.log('Missing Babel Polyfill.  May experience some weirdness in IE < 9.'); }

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

const attachEvents = () => {

  let cards = document.getElementsByClassName('little-card');
  Array.prototype.forEach.call(cards, elem => {
    elem.addEventListener('click', evt => {
      let card = evt.currentTarget.id;
      console.log(card);
      modalActions.showAboutModal(card);
    });
  });

};

attachEvents();
ReactDOM.render(<AboutModal />, document.getElementById('about-modal'));
