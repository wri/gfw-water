import {modalText, alertsModalConfig} from 'js/config';
import ModalWrapper from 'components/Modals/ModalWrapper';
import TextInput from 'components/Forms/TextInput';
import CheckboxInput from 'components/Forms/CheckboxInput';
import {clone} from 'utils/AppUtils';
import GeoHelper from 'helpers/GeoHelper';
import React from 'react';
import {Form} from 'formsy-react';
import Deferred from 'dojo/Deferred';

const alertsText = modalText.alerts;
export default class AlertsModal extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      textValid: false,
      formaSubscription: false,
      fireSubscription: false,
      validationErrors: {}
    };
  }

  validateText () {
    this.setState({textValid: true});
  }

  invalidateText () {
    this.setState({textValid: false});
  }

  toggleForma () {
    this.setState({formaSubscription: !this.state.formaSubscription});
  }

  togglefire () {
    this.setState({fireSubscription: !this.state.fireSubscription});
  }

  formaSubmit (geoJson, subscriptionName, email) {
    var deferred = new Deferred(),
        url = alertsModalConfig.requests.forma.url,
        options = clone(alertsModalConfig.requests.forma.options),
        data = JSON.stringify({
          topic: options.data.topic,
          email: email,
          geom: '{"type": "' + geoJson.type + '", "coordinates":[' + JSON.stringify(geoJson.geom) + ']}'
        }),
        request = new XMLHttpRequest(),
        self = this;

    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        deferred.resolve((JSON.parse(request.response).subscribe) ? 'messagesConfig.formaSuccess' : 'messagesConfig.formaFail');
      }
    };
    request.addEventListener('error', function () {
      deferred.resolve(false);
    }, false);
    request.open(options.method, url, true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // request.send(data);

    // Analytics.sendEvent('Subscribe', 'Monthly Clearance Alerts', 'User is subscribing to Monthly Clearance Alerts.');

    debugger
    return deferred.promise;
  }

  fireSubmit (unionedPolygon, subscriptionName, email) {
    var deferred = new Deferred(),
        // messagesConfig = TEXT.messages,
        firesConfig = alertsModalConfig.requests.fires,
        url = firesConfig.url,
        options = clone(firesConfig.options); 

    options.data.features = JSON.stringify({
      rings: unionedPolygon.rings,
      spatialReference: unionedPolygon.spatialReference
    });
    options.data.msg_addr = email;
    options.data.area_name = subscriptionName;

    //xhr(url, options).then(function (response) {
    //  deferred.resolve((response.message && response.message === firesConfig.successMessage) ? 'messagesConfig.fireSuccess' : 'messagesConfig.fireFail');
    //});

    //Analytics.sendEvent('Subscribe', 'Fire Alerts', 'User is subscribing to Fire Alerts.');

    debugger
    return deferred.promise;
  }

  submit (model) {
    console.log(model)
    let subscriptions = [],
        features = [],
        feature,
        polygons;

    feature = get subscription feature from store?

    if (this.state.formaSubscription === true) {
      subscriptions.push(this.formaSubmit(GeoHelper.convertGeometryToGeometric(feature), model['subscription-name'], model['email']));
      // use feature directly?
      // subscriptions.push(this.formaSubmit(GeoHelper.convertGeometryToGeometric(feature), model['subscription-name'], model['email']));
    }
    if (this.state.fireSubscription === true) {
      subscriptions.push(this.fireSubmit(feature, model['subscription-name'], model['email']));
      // use feature directly?
      // subscriptions.push(this.fireSubmit(feature, model['subscription-name'], model['email']));
    }

    all(subscriptions).then(function (responses) {
      alert(responses.join('\n'));
    });
  }

  render () {
    const subscriptionValid = this.state.formaSubscription === true || this.state.fireSubscription === true;
    return (
      <ModalWrapper>
        <div className='alerts-modal'>
          <div>{alertsText.title}</div>
          <Form onSubmit={::this.submit} onChange={this.validateForm} onValid={::this.validateText} onInvalid={::this.invalidateText}>
            <TextInput name='email' type='text' label={alertsText.descriptions.email} placeholder='your_address@email.com' validations='isEmail' validationErrors={{isEmail: 'Invalid address'}} required />
            <br />
            <TextInput name='subscription-name' type='text' label={alertsText.descriptions.subscription} value='My Subscription' required />
            <br />
            <label>{alertsText.descriptions.subscriptionTypes}</label>
            {subscriptionValid === true ? null : <div>Required</div>}
            <CheckboxInput label='Monthly Clearance Alerts' className='tree-cover' checked={this.state.formaSubscription} clickHandle={::this.toggleForma} />
            <CheckboxInput label='Fire Alerts' className='active-fires' checked={this.state.fireSubscription} clickHandle={::this.togglefire} />
            <br />
            <button className='gfw-btn' type='submit' disabled={!subscriptionValid || !this.state.textValid}>Subscribe</button>
          </Form>
        </div>
      </ModalWrapper>
    );
  }

}
// TODO: move static text to config
