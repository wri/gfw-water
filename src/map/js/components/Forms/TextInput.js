import React from 'react';
import {Decorator as formsyElement} from 'formsy-react';

@formsyElement()
export default class TextInput extends React.Component {

  changeValue (event) {
    this.props.setValue(event.currentTarget.value);
  }

  render () {
    let className = this.props.isValid() === true ? '' : 'invalid',
        errorMessage = this.props.isValid() === true ? null : (
          <div className='alerts-modal__error-label'>{this.props.getErrorMessage() || 'Required'}</div>
        );

        if (this.props.class) {
          className += ' ' + this.props.class;
        }

    return (
      <div>
        <label>{this.props.label}</label>
        <input className={className} type={this.props.type || 'text'} name={this.props.name} value={this.props.getValue()} onChange={::this.changeValue} placeholder={this.props.placeholder || ''} maxLength={this.props.maxLength || 100}/>
        {errorMessage}
      </div>
    );
  }
}
