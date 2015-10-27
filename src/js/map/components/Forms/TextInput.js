import React from 'react';
import {Decorator as formsyElement} from 'formsy-react';

@formsyElement()
export default class TextInput extends React.Component {

  changeValue (event) {
    this.props.setValue(event.currentTarget.value);
  }

  render () {
    let errorMessage = this.props.isValid() === true ? null : (
      <span>{this.props.getErrorMessage() || 'Required'}</span>
    );

    return (
      <div>
        <label>{this.props.label}</label>
        <br />
        {errorMessage}
        <input className='fill__wide' type={this.props.type || 'text'} name={this.props.name} value={this.props.getValue()} onChange={::this.changeValue} placeholder={this.props.placeholder || ''} />
      </div>
    );
  }
}
