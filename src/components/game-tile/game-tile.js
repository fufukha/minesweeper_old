import React, { Component } from 'react';

export default class GameTile extends Component {
	constructor() {
		super();

    this.state = {
      isFlagged: false
    }

		this._rightClick = this._rightClick.bind(this);
	}

	// componentDidUpdate(prevState) {
	// 	const { updateMinesFlagged } = this.props;
	//
	// 	if(prevState.isFlagged && !this.state.isFlagged) {
	// 		updateMinesFlagged(-1);
	// 	}
	// 	if(!prevState.isFlagged && this.state.isFlagged) {
	// 		updateMinesFlagged(1);
	// 	}
	// }

  render() {
    const { value, index, updateFlags, setToDisplay } = this.props;
    const { isFlagged } = this.state;

    return (
      <div
        className='hide'
        onContextMenu={this._rightClick}
        onClick={(event) => setToDisplay(event, index)}>
				{isFlagged ? '📍' : ''}
      </div>
    );
  }

	_rightClick(event) {
		event.preventDefault();
		const { updateMinesFlagged } = this.props;
    const { isFlagged } = this.state;

		this.setState({ isFlagged: !isFlagged });

		if(isFlagged) {
			updateMinesFlagged(-1);
			event.target.removeEventListener('click', this._leftClick, false);
		} else {
			updateMinesFlagged(1);
			event.target.addEventListener('click', this._leftClick);
		}
	}
}
