import {modalText, alertsModalConfig} from 'js/config';
import ModalWrapper from 'components/Modals/ModalWrapper';
import {modalActions} from 'actions/ModalActions';
import TextInput from 'components/Forms/TextInput';
import CheckboxInput from 'components/Forms/CheckboxInput';
import {clone} from 'utils/AppUtils';
import GeoHelper from 'helpers/GeoHelper';
import {analysisStore} from 'stores/AnalysisStore';

import React from 'react';
import {Form} from 'formsy-react';
import Deferred from 'dojo/Deferred';
import all from 'dojo/promise/all';
import Graphic from 'esri/graphic';
import xhr from 'dojo/request/xhr';

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

  close () {
    modalActions.hideModal(React.findDOMNode(this).parentElement);
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
        request = new XMLHttpRequest();

    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        deferred.resolve((JSON.parse(request.response).subscribe) ? alertsText.messages.formaSuccess : alertsText.messages.formaFail);
      }
    };
    request.addEventListener('error', function () {
      deferred.resolve(false);
    }, false);
    request.open(options.method, url, true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(data);

    // Analytics.sendEvent('Subscribe', 'Monthly Clearance Alerts', 'User is subscribing to Monthly Clearance Alerts.');
    return deferred.promise;
  }

  fireSubmit (feature, subscriptionName, email) {
    var deferred = new Deferred(),
        firesConfig = alertsModalConfig.requests.fires,
        url = firesConfig.url,
        options = clone(firesConfig.options);

    options.data.features = JSON.stringify({
      rings: feature.geometry.rings,
      spatialReference: feature.geometry.spatialReference
    });
    options.data.msg_addr = email;
    options.data.area_name = subscriptionName;

    xhr(url, options).then(function (response) {
      deferred.resolve((response.message && response.message === firesConfig.successMessage) ? alertsText.messages.fireSuccess : alertsText.messages.fireFail);
    });

    //Analytics.sendEvent('Subscribe', 'Fire Alerts', 'User is subscribing to Fire Alerts.');
    return deferred.promise;
  }

  submit (model) {
    let subscriptions = [],
        feature = analysisStore.getState().activeWatershed,
        subscriptionName = model['subscription-name'] || 'My Subscription';

    feature = new Graphic(GeoHelper.simplify(feature.geometry));

    if (this.state.formaSubscription === true) {
      subscriptions.push(this.formaSubmit(GeoHelper.convertGeometryToGeometric(feature.geometry), subscriptionName, model.email));
    }
    if (this.state.fireSubscription === true) {
      subscriptions.push(this.fireSubmit(feature, subscriptionName, model.email));
    }

    all(subscriptions).then(function (responses) {
      alert(responses.join('\n'));
    });

    ::this.close();
  }

  render () {
    const subscriptionValid = this.state.formaSubscription === true || this.state.fireSubscription === true;
    return (
      <ModalWrapper>
        <div className='alerts-modal'>
          <div><strong>{alertsText.title}</strong></div>
          <br />
          <Form onSubmit={::this.submit} onChange={this.validateForm} onValid={::this.validateText} onInvalid={::this.invalidateText}>
            <TextInput name='email' type='text' label={alertsText.descriptions.email} validations='isEmail' validationErrors={{isEmail: 'Invalid address'}} required />
            <br />
            <TextInput name='subscription-name' type='text' label={alertsText.descriptions.subscription} placeholder='My Subscription' maxLength={50}/>
            <br />
            <label>{alertsText.descriptions.subscriptionTypes}</label>
            <CheckboxInput label='Monthly Clearance Alerts' className='tree-cover' checked={this.state.formaSubscription} clickHandle={::this.toggleForma} />
            <CheckboxInput label='Fire Alerts' className='active-fires' checked={this.state.fireSubscription} clickHandle={::this.togglefire} />
            {subscriptionValid === true ? null : <div className='alerts-modal__error-label'>Required</div>}
            <br />
            <button className='alerts-modal__button--blue' type='submit' disabled={!subscriptionValid || !this.state.textValid}>Subscribe</button>
          </Form>
        </div>
      </ModalWrapper>
    );
  }

}
// TODO: move static text to config
