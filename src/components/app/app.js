import React, { Component } from 'react';
import Timer from '../timer/timer';
import FlaggedMines from '../flagged_mines/flagged_mines';
import GameBoard from '../game-board/game-board';

export default class App extends Component {
	constructor() {
		super();

		 this.config = {
			columns: 30,
			rows: 16,
			mines: 99
		}

		this.state = {
			isActive: false,
			minesFlagged: 0
			 //,gameBoard: this._createBoard(_getConfig(this.state.level)),
			//tileStates: this.createMatrix(0);
			//tileStates: //matrix uncl clk flg
		}

		this._toActive = this._toActive.bind(this);
		this._updateMinesFlagged = this._updateMinesFlagged.bind(this);
	}

    render() {
			const { isActive, minesFlagged } = this.state;

	    return (
				<div className='app'>
					<div className='scoreBoard'>
						<FlaggedMines
							totalMines={this.config.mines}
							minesFlagged={minesFlagged} />
						<div>🙂</div>
					 	<Timer isActive={isActive} />
					</div>
					<GameBoard
						onClick={this._toActive}
						onContextMenu={this._toActive}
						config={this.config}
						updateMinesFlagged={this._updateMinesFlagged}/>
				</div>
	    );
    }

	_toActive(event) {
		event.preventDefault();
		const { isActive } = this.state;
		this.setState( { isActive: true });
		event.target.removeEventListener('click', this._toActive, false);
		event.target.removeEventListener('contextmenu', this._toActive, false);
	}

	_setLevel(event) {
		event.preventDefault();
		return event.target.value();
	}

	_updateMinesFlagged(n) {
		const { minesFlagged } = this.state;
		const currMinesFlagged = minesFlagged + n;

		if(currMinesFlagged < 1000 && currMinesFlagged > -100) {
			this.setState({ minesFlagged: currMinesFlagged})
		}
	}
}
