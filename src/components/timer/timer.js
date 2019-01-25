import React, { Component } from 'react';

export default class Timer extends Component {
  constructor() {
    super();
  }

  render() {
    const { milliseconds } = this.props;
    const timeText = Math.floor(milliseconds / 1000).toString().padStart(3, 0);

    return (
      <div className='scoreBoard-numbers'>888
        <div>{timeText}</div>
      </div>
    );
  }
}
