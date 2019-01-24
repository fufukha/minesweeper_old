import React, { Component } from 'react';
import GameTile from '../game-tile/game-tile';

export default class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameBoard: this._createBoard(this.props.config[this.props.level])
    }
  }

  componentDidUpdate(prevProps) {
    const { level, config } = this.props;
    if(prevProps.level != level) {
      setState({ gameBoard: this._createBoard(config[level]) });
    }
  }

  render() {
    const { onClick, onContextMenu, level, updateMinesFlagged } = this.props;
    const { gameBoard } = this.state;
    const gameBoardTiles = gameBoard.map(row =>
      row.map(ele => <GameTile
        updateMinesFlagged={updateMinesFlagged}
        value={ele === true ? '💣' : ele} />)
    );

    return (
      <div
        className={'gameBoard-' + level}
        onClick={onClick}
        onContextMenu={onContextMenu}>
          {gameBoardTiles}
      </div>
    );
  }

  _createBoard(boardConfig) {
    let board = new Array(boardConfig.rows);

  	for(let i = 0; i < boardConfig.rows; i++) {
  		board[i] = new Array(boardConfig.columns).fill(0)
  	}

    let count = boardConfig.mines + 1;
    const randomIndexSet = new Set();

  	while(--count) {

  		const i = this._randomInteger(boardConfig.rows);
  		const j = this._randomInteger(boardConfig.columns);

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
}
