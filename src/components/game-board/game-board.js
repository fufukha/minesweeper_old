import React, { Component } from 'react';
import GameTile from '../game-tile/game-tile';

export default class GameBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onClick, onContextMenu, updateFlags, gameBoard,
      /*setToDisplay,*/ setToFlag, tileStates, tileLeftClick } = this.props;
    const gameBoardTiles = gameBoard.map((row, i) =>
      row.map((ele, j) =>
        <GameTile
        index={[i, j]}
        key={(i*10) + j}
        /*setToDisplay={setToDisplay}*/
        tileLeftClick={tileLeftClick}
        setToFlag={setToFlag}
        tileState={tileStates[i][j]}
        value={gameBoard[i][j]}
        updateFlags={updateFlags}/>
      )
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
