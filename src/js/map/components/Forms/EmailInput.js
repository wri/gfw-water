import React from 'react';
import {Decorator as FormsyElement} from 'formsy-react';

@FormsyElement()
export class EmailInput extends React.Component {
  render () {
    return (
      <input value={this.props.getValue()} onChange={(event) => console.log(event.target.value)} />
    );
  }
}
