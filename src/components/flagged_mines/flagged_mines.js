import React, { Component } from 'react';

export default class FlaggedMines extends Component {
	constructor() {
		super();
	}

	render() {
		const { level, minesFlagged, config } = this.props;
		const totalMines = config[level]['mines'];
		const mineText = this._toThreeDigStr(totalMines - minesFlagged);

		return (
			<div className='scoreBoard-numbers'>888
				<div>{mineText}</div>
			</div>
		);
	}

	_toThreeDigStr(n) {
		if(n > -1) {
			return (n).toString().padStart(3, 0);
		} else {
			return `-${(Math.abs(n)).toString().padStart(2, 0)}`;
		}
	}
}
