import React, { Component } from 'react';
import GameTile from '../game-tile/game-tile';

export default class GameBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onClick, onContextMenu, updateFlags, gameBoard } = this.props;
    const gameBoardTiles = gameBoard.map(row =>
      row.map(ele => <GameTile
        onContextMenu={updateFlags}
        value={ele === true ? '💣' : ele} />)
    );

    return (
      <div
        className='gameBoard-expert'
        onClick={onClick}
        onContextMenu={onContextMenu}>
          {gameBoardTiles}
      </div>
    );
  }
}
