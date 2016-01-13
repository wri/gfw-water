/**
* Simple wrapper around google analytics api
* @param {string} eventCategory - Category, something like Map, Report, HomePage, etc.
* @param {string} eventAction - Action, something like Click, Toggle, Analysis, Upload, Draw
* @param {string} eventLabel - Label, something like Layer: ${layerName}
* @param {number=} eventValue - Optional numeric value tied to the event
*/
export default function (eventCategory, eventAction, eventLabel, eventValue) {
  let payload = { hitType: 'event' };
  payload.eventCategory = eventCategory;
  payload.eventAction = eventAction;
  payload.eventLabel = eventLabel;
  if (eventValue) { payload.eventValue = eventValue; }

  if (ga) {
    ga('send', payload);
  }
}
