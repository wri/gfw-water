import {modalText} from 'js/config';
import ModalWrapper from 'components/Modals/ModalWrapper';
import {EmailInput} from 'components/Forms/EmailInput';
import React from 'react';
import {Form} from 'formsy-react';

export default class AlertModal extends React.Component {

  getInitialState () {
    return {
      validationErrors: {}
    }
  }

  constructor (props) {
    super(props);
    this.state = this.getInitialState()
  }

  render() {
    return (
      <ModalWrapper>
        <div>{modalText.alerts.title}</div>
        <Form>
          <EmailInput className='hidden' name='email' validations='isEmail' validationErrors={{isEmail: 'Please enter a valid email'}}>example@email.com</EmailInput>
          <div>
            <div>
              <button>Subscribe</button>
            </div>
          </div>
        </Form>
      </ModalWrapper>
    );
  }

}

