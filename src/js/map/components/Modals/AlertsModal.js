import {modalText} from 'js/config';
import ModalWrapper from 'components/Modals/ModalWrapper';
import TextInput from 'components/Forms/TextInput';
import CheckboxInput from 'components/Forms/CheckboxInput';
import React from 'react';
import {Form} from 'formsy-react';

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

  formaSubmit() {
    console.log('forma');
  }

  fireSubmit() {
    console.log('fire');
  }

  submit (model) {
    console.log(model)
    if (this.state.formaSubscription === true) {this.formaSubmit();}
    if (this.state.fireSubscription === true) {this.fireSubmit();}
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
            <CheckboxInput label='Fire Alerts' className='active-fire' checked={this.state.fireSubscription} clickHandle={::this.togglefire} />
            <br />
            <button className='gfw-btn' type='submit' disabled={!subscriptionValid || !this.state.textValid}>Subscribe</button>
          </Form>
        </div>
      </ModalWrapper>
    );
  }

}
