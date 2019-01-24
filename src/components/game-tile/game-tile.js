import React, { Component } from 'react';

export default class GameTile extends Component {
	constructor() {
		super();

    this.state = {
      isHidden: true,
      isFlagged: false
    }

    this._leftClick = this._leftClick.bind(this);
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
    const { value } = this.props;
    const { isHidden, isFlagged } = this.state;

    return (
      <div
        className={(isHidden ? 'hide': 'show') + (isFlagged ? ' flag' : '')}
        onContextMenu={this._rightClick}
        onClick={this._leftClick}>
        {isHidden ? '' : value}
				{isFlagged ? '📍' : ''}
      </div>
    );
  }

  _leftClick(event) {
    event.preventDefault();

		this.setState({ isHidden: false });
		event.target.removeEventListener('click', this._leftClick, false);
		event.target.removeEventListener('contextmenu', this._rightClick, false);
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
