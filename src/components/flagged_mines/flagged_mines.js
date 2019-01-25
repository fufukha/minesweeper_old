import React, { Component } from 'react';

export default class FlaggedMines extends Component {
	constructor() {
		super();
	}

	render() {
		const { minesText } = this.props;

		return (
			<div className='scoreBoard-numbers'>888
				<div>{minesText}</div>
			</div>
		);
	}
}
