/**
* NOTE:
*   This loader will try to set it's container height and width to 100%, so it can have a transparent
*   background, and the spinner will be in the middle, when using this, it should be placed in a container
*   that has a position of absolute or relative.  Otherwise the css may not display as expected.
*/

import React from 'react';

export default class Loader extends React.Component {

  render () {
    return (
      <div className={`spinner-container ${this.props.active ? 'spinner-container--loading' : 'hidden'}`}>
        <div className='spinner-container__spinner'>
          <svg width="50" height="50" dangerouslySetInnerHTML={{
            __html: '<g transform="translate(25,25) rotate(-90)"><path d="M0,25A25,25 0 1,1 0,-25A25,25 0 1,1 0,25M0,20A20,20 0 1,0 0,-20A20,20 0 1,0 0,20Z" style="fill: rgb(255, 255, 255); stroke: rgb(204, 204, 204);"></path><path class="foreground" d="M1.5308084989341915e-15,-25A25,25 0 0,1 25,0L20,0A20,20 0 0,0 1.2246467991473533e-15,-20Z" style="fill: rgb(85, 85, 85);" transform="rotate(709.287459262793)"></path>'
          }} />
        </div>
      </div>
    );
  }

}

Loader.propTypes = {
  active: React.PropTypes.bool.isRequired
};
