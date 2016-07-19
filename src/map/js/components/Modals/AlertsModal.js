import {modalText, alertsModalConfig} from 'js/config';
import ModalWrapper from 'components/Modals/ModalWrapper';
import {modalActions} from 'actions/ModalActions';
import TextInput from 'components/Forms/TextInput';
import CheckboxInput from 'components/Forms/CheckboxInput';
import {clone} from 'utils/AppUtils';
import GeoHelper from 'helpers/GeoHelper';
import Loader from 'components/Loader';
import {analysisStore} from 'stores/AnalysisStore';

import React from 'react';
import {Form} from 'formsy-react';
import Deferred from 'dojo/Deferred';
import all from 'dojo/promise/all';
import Graphic from 'esri/graphic';

const alertsText = modalText.alerts;
export default class AlertsModal extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      textValid: false,
      isLoading: false,
      honeyValue: '',
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

  updateHoney (evt) {
    this.setState({honeyValue: evt.target.value});
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
        options = clone(firesConfig.options),
        request = new XMLHttpRequest(),
        params = '';


    params += 'area_name=' + subscriptionName;
    params += '&msg_addr=' + email;
    params += '&msg_type=email';

    params += '&features=' + JSON.stringify({
      rings: feature.geometry.rings,
      spatialReference: feature.geometry.spatialReference
    });

    options.data.features = {
      rings: feature.geometry.rings,
      spatialReference: feature.geometry.spatialReference
    };
    options.data.msg_addr = email;

    request.addEventListener('load', function () {
      deferred.resolve(alertsText.messages.fireSuccess);
    }, false);
    request.addEventListener('error', function (error) {
      console.log(error);
      deferred.resolve(alertsText.messages.fireFail);
    }, false);
    request.open(options.method, url, true);

    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);

    //Analytics.sendEvent('Subscribe', 'Fire Alerts', 'User is subscribing to Fire Alerts.');
    return deferred.promise;
  }

  submit (model) {
    this.setState({isLoading: true});
    let subscriptions = [],
      feature = analysisStore.getState().activeWatershed,
      subscriptionName = model['subscription-name'] || 'My Subscription';

    //- If honeyPot has a value, bail out now, will probably never happen, as site crawlers wont see forms generated in JS
    // if (this.refs.password && this.refs.password.value !== '') {
    //   return;
    // }
    if (this.state.honeyValue.length > 0) {
      return;
    }

    feature = new Graphic(GeoHelper.simplify(feature.geometry));

    // if (this.state.formaSubscription === true) {
    //   subscriptions.push(this.formaSubmit(GeoHelper.convertGeometryToGeometric(feature.geometry), subscriptionName, model.email));
    // }
    if (this.state.fireSubscription === true) {
      subscriptions.push(this.fireSubmit(feature, subscriptionName, model.email));
    }

    all(subscriptions).then(responses => {
      this.setState({isLoading: false});
      ::this.close();

      modalActions.showBasicModal('', responses[0]);
    });

  }

  render () {
    // const subscriptionValid = this.state.formaSubscription === true || this.state.fireSubscription === true;
    const subscriptionValid = this.state.fireSubscription === true;
    //- Final input with name password is hidden because it is not used, it is used as a honeypot

    //<CheckboxInput label='Monthly Clearance Alerts' className='tree-cover' checked={this.state.formaSubscription} clickHandle={::this.toggleForma} />
    return (
      <ModalWrapper>
        <div className='alerts-modal'>
          <Loader active={this.state.isLoading} />
          <div className='alert-title'><strong>{alertsText.title}</strong></div>
          <br />
          <Form onSubmit={::this.submit} onChange={this.validateForm} onValid={::this.validateText} onInvalid={::this.invalidateText}>
            <TextInput class='longer' name='email' type='text' label={alertsText.descriptions.email} validations='isEmail' validationErrors={{isEmail: 'Invalid address'}} required />
            <br />
            <TextInput class='longer' name='subscription-name' type='text' label={alertsText.descriptions.subscription} placeholder='My Subscription' maxLength={50}/>
            <br />
            <label>{alertsText.descriptions.subscriptionTypes}</label>
            <CheckboxInput label='Fire Alerts' className='active-fires' checked={this.state.fireSubscription} clickHandle={::this.togglefire} />
            {subscriptionValid === true ? null : <div className='alerts-modal__error-label'>Required</div>}
            <br />
            <button className='alerts-modal__button--blue' type='submit' disabled={!subscriptionValid || !this.state.textValid}>Subscribe</button>
            <input className='hidden' id='password-submit' onChange={this.updateHoney} />
          </Form>
        </div>
      </ModalWrapper>
    );
  }

}
// TODO: move static text to config
