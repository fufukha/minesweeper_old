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
			flags: 0,
			gameBoard: this._createBoard(this.config),
			tileStates: this._createMatrix(this.config.rows, this.config.columns, 'hide')
			//TODO add tileStates: this.createMatrix(0);
			//tileStates: //matrix uncl clk flg
		}

		this.timerId = 0;
		this._timer = this._timer.bind(this);
		this._toActive = this._toActive.bind(this);
		this._startTimer = this._startTimer.bind(this);
		this._updateFlags = this._updateFlags.bind(this);
		this._setToDisplay = this._setToDisplay.bind(this);
		this._setToFlag = this._setToFlag.bind(this);
	}

  render() {
		const { flags, tileStates,
			gameBoard, startTime } = this.state;

    return (
			<div className='app'>
				<div className='scoreBoard'>
					<FlaggedMines
						minesText={this._toThreeDigStr(this.config.mines - flags)} />
					<div>🙂</div>
				 	<Timer milliseconds={startTime == null ? 0 : this._timeLapse()} />
				</div>
				<GameBoard
					onClick={this._toActive}
					onContextMenu={this._toActive}
					gameBoard={gameBoard}
					setToDisplay={this._setToDisplay}
					tileStates={tileStates}
					setToFlag={this._setToFlag}
					updateFlags={this._updateFlags}/>
			</div>
    );
  }

	_toActive(event) {
		event.preventDefault();
		const { isActive } = this.state;
		if(!isActive) this.setState({ isActive: true },this._startTimer());
	}

	_setLevel(event) {
		event.preventDefault();
		return event.target.value();
	}

	_updateFlags(n) {
		const { flags } = this.state;
		const currFlags = flags + n;

		if(currFlags < 1000 && currFlags > -100) {
			this.setState({ flags: currFlags })
		}
	}

	//game tiles
	_setToDisplay(event, i, j) {
    event.preventDefault();
		const { tileStates} = this.state;

		if(tileStates[i][j] == 'hide') {
			tileStates[i][j] = 'display';
			this.setState({ tileStates: tileStates });
		}
  }

	_setToFlag(event, i, j) {
		event.preventDefault();
		const { tileStates } = this.state;

		if(tileStates[i][j] == 'hide') {
			tileStates[i][j] = 'flag';
		} else if (tileStates[i][j] == 'flag') {
			tileStates[i][j] = 'hide';
		}

		this.setState({ tileStates: tileStates });
		tileStates[i][j] == 'flag' ? this._setFlagCount(1) : this._setFlagCount(-1);
		//TODO updateFlags
  }

	_setFlagCount(n) {
	  const { flags } = this.state;
		//TODO add conditional
		this.setState({ flags: flags + n });
	}

	//TODO prevent first clicking on bomb
	_createMatrix(rows, columns, fill) {
		let matrix = new Array(rows);

		for(let i = 0; i < rows; i++) {
			matrix[i] = new Array(columns).fill(fill)
		}
		return matrix;
	}

	_createBoard(boardConfig) {
		const [rows, columns] = [boardConfig.rows, boardConfig.columns];
		let board = this._createMatrix(rows, columns, 0);

    let count = boardConfig.mines + 1;
    const randomIndexSet = new Set();

  	while(--count) {
  		const i = this._randomInteger(rows);
  		const j = this._randomInteger(columns);

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

	//mineText
	_toThreeDigStr(n) {
		if(n > -1) {
			return (n).toString().padStart(3, 0);
		} else {
			return `-${(Math.abs(n)).toString().padStart(2, 0)}`;
		}
	}
}
