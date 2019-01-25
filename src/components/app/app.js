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
			startTime: null,
			minesFlagged: 0,
			gameBoard: this._createBoard(this.config)
			//tileStates: this.createMatrix(0);
			//tileStates: //matrix uncl clk flg
		}

		this.timerId = 0;
		this._timer = this._timer.bind(this);
		this._toActive = this._toActive.bind(this);
		this._startTimer = this._startTimer.bind(this);
		this._updateMinesFlagged = this._updateMinesFlagged.bind(this);
	}

    render() {
			const { isActive, minesFlagged, gameBoard } = this.state;

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
						gameBoard={gameBoard}
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

	_createBoard(boardConfig) {
		const [rows, cols] = [boardConfig.rows, boardConfig.columns];
    let board = new Array(rows);

  	for(let i = 0; i < rows; i++) {
  		board[i] = new Array(cols).fill(0)
  	}

    let count = boardConfig.mines + 1;
    const randomIndexSet = new Set();

  	while(--count) {
  		const i = this._randomInteger(rows);
  		const j = this._randomInteger(cols);

      if(randomIndexSet.has(`${i} ${j}`)){
        count++;
      } else {
        randomIndexSet.add(`${i} ${j}`);
        board[i][j] = true;
        board = this._peripheralCount(i, j, board);
      }
  	}
  	return board;
  }

  _randomInteger(max) {
	   return Math.floor(Math.random() * max)
  }

  _peripheralCount(i, j, matrix) {
  	const lastI = matrix.length - 1;
  	const lastJ = matrix[0].length - 1;

    if(i != 0 && matrix[i - 1][j] !== true) matrix[i - 1][j]++;
  	if(i < lastI && matrix[i + 1][j] !== true) matrix[i + 1][j]++;
  	if(j != 0 && matrix[i][j - 1] !== true) matrix[i][j - 1]++;
  	if(j < lastJ && matrix[i][j + 1] !== true) matrix[i][j + 1]++;
  	if(i != 0 && j != 0 && matrix[i - 1][j - 1] !== true) matrix[i - 1][j - 1]++;
  	if(i != 0 && j < lastJ && matrix[i - 1][j + 1] !== true) matrix[i - 1][j + 1]++;
  	if(i < lastI && j != 0 && matrix[i + 1][j - 1] !== true ) matrix[i + 1][j - 1]++;
  	if(i <lastI && j < lastJ && matrix[i + 1][j + 1] !== true) matrix[i + 1][j + 1]++

  	return matrix;
  }

	//Timer Logic
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
      startTime: null
    })
    this.timerId = 0;
  }
}
