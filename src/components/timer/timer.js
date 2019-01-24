import React, { Component } from 'react';

export default class Timer extends Component {
  constructor() {
    super();

    this.state = {
      startTime: null
    }

    this.timerId = 0;
    this._startTimer = this._startTimer.bind(this);
    this._timer = this._timer.bind(this);
    this._stopTimer = this._stopTimer.bind(this);
    this._resetTimer = this._resetTimer.bind(this);
    this._timeToText = this._timeToText.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(!prevProps.isActive && this.props.isActive) this._startTimer();
    if(prevProps.isActive && !this.props.isActive) this._stopTimer();
  }

  render() {
    const timeText = this.state.startTime == null ? '000' : this._timeToText(this._timeLapse());

    return (
      <div className='scoreBoard-numbers'>888
        <div>{timeText}</div>
      </div>
    );
  }

  _startTimer() {
    this.setState({ startTime: (new Date()).getTime() });

    if(this.timerId == 0) {
      this.timerId = setInterval(this._timer, 1000);
    }
  }

  _timer() {
    this.setState({ a: Math.random() }) //trigger render() with a random change
    if(this._timeLapse() > 999000) this._stopTimer();
  }

  _stopTimer() {
    clearInterval(this.timerId);
  }

  _timeLapse() {
    return (new Date()).getTime() - this.state.startTime;
  }

  _resetTimer() {
    this.setState({
      timerText: '000',
      seconds: 0
    })
    this.timerId = 0;
  }

  _timeToText(milliseconds) {
    return Math.floor(milliseconds / 1000).toString().padStart(3, 0);
  }
}
