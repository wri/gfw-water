import React from 'react';

export default class CheckboxInput extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <span className={`layer-checkbox ${this.props.className} ${this.props.checked === true ? 'active' : ''}`}>
          <span className='toggle-switch pointer' onClick={this.props.clickHandle}><span /></span>
        </span>
        <span className='pointer' onClick={this.props.clickHandle} style={{paddingLeft: '.5em'}}>{this.props.label}</span>
      </div>
    );
  }
}
// TODO: refactor layer-checkbox classes into generic checkbox class
// TODO: refactor styles into classes
