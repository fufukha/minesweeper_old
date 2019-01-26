import React, { Component } from 'react';

export default class GameTile extends Component {
	constructor() {
		super();
	}

  render() {
    const { value, index, updateFlags,
			setToDisplay, setToFlag } = this.props;
		const [i, j] = [index[0], index[1]]

    return (
      <div
        className='hide'
        onContextMenu={(event) => setToFlag(event, i, j)}
        onClick={(event) => setToDisplay(event, i, j)}>
      </div>
    );
  }
}
