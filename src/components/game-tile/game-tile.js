import React, { Component } from 'react';

export default class GameTile extends Component {
	constructor() {
		super();
	}

  render() {
    const { value, index, updateFlags, tileState,
			setToDisplay, setToFlag } = this.props;
		const [i, j] = [index[0], index[1]]

    return (
      <div
        className={tileState == 'flag' ? 'hide' : tileState}
        onContextMenu={(event) => setToFlag(event, i, j)}
        onClick={(event) => setToDisplay(event, i, j)}>
				{tileState != 'hide' && (
					tileState == 'flag' ?
							'📍' : (value === true ? '💣' : value)
				)}
      </div>
    );
  }
}
