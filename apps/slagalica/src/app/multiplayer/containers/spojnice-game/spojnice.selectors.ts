import * as fromPlayer from '@slagalica-app/multiplayer/reducers';
import { createSelector } from '@ngrx/store';
import { SpojniceStates, PlayerRole } from '@slagalica/data';
import { Dictionary } from 'lodash';

const getGame = fromPlayer.getSpojniceGame;

const getGameState = createSelector(
  getGame,
  game => game.state
);

const getCurrentStateDescription = createSelector(
  getGameState,
  state => {
    switch (state) {
      case SpojniceStates.RedPlaying:
        return 'Red playing.';
      case SpojniceStates.BluePlaying:
        return 'Blue playing.';
      case SpojniceStates.RedStrikeOutBluePlaying:
        return 'Red has not completed all. Blue playing.';
      case SpojniceStates.BlueStrikeOutRedPlaying:
        return 'Blue has not completed all. Red playing.';
      case SpojniceStates.Finished:
        return 'Game finished.';
      default:
        return '';
    }
  }
);

const getTurnColor = createSelector(
  getGameState,
  state => ({
    red:
      state === SpojniceStates.RedPlaying ||
      state === SpojniceStates.BlueStrikeOutRedPlaying,
    blue:
      state === SpojniceStates.BluePlaying ||
      state === SpojniceStates.RedStrikeOutBluePlaying
  })
);

const isInputEnabled = createSelector(
  getGameState,
  fromPlayer.getAmIBlue,
  fromPlayer.getAmIRed,
  (state, amIBlue, amIRed) => {
    if (
      (state === SpojniceStates.RedPlaying ||
        SpojniceStates.BlueStrikeOutRedPlaying) &&
      amIRed
    )
      return true;
    else if (
      (state === SpojniceStates.BluePlaying ||
        SpojniceStates.RedStrikeOutBluePlaying) &&
      amIBlue
    )
      return true;
    else return false;
  }
);

const getConnections = createSelector(
  getGame,
  game => game.connections
);

const getLeftSide = createSelector(
  getGame,
  game => game.leftSide
);

const getConnectionsTables = createSelector(
  getConnections,
  connections =>
    connections.reduce(
      (tables, conn) => {
        tables.from[conn.from] = conn.by;
        tables.to[conn.to] = conn.by;
        return tables;
      },
      {
        from: {} as Dictionary<PlayerRole>,
        to: {} as Dictionary<PlayerRole>
      }
    )
);

const getLeftSideTiles = createSelector(
  getLeftSide,
  getConnectionsTables,
  (leftSide, tables) =>
    leftSide.map((text, index) => ({
      text,
      color: tables.from[index]
    }))
);

const getRightSide = createSelector(
  getGame,
  game => game.rightSide
);

const getRightSideTiles = createSelector(
  getRightSide,
  getConnectionsTables,
  (rightSide, tables) =>
    rightSide.map((text, index) => ({
      text,
      color: tables.to[index],
      disabled: !!tables.to[index]
    }))
);

const getRedPlayer = createSelector(
  getGame,
  game => game.red
);

const getRedPlayerPoints = createSelector(
  getRedPlayer,
  player => player.points
);

const getBluePlayer = createSelector(
  getGame,
  game => game.blue
);

const getBluePlayerPoints = createSelector(
  getBluePlayer,
  player => player.points
);

const _getCurrentIndex = createSelector(
  getGame,
  game => game.currentIndex
);

const getCurrentIndex = createSelector(
  _getCurrentIndex,
  getGameState,
  (index, state) => {
    switch (state) {
      case SpojniceStates.BluePlaying:
      case SpojniceStates.RedPlaying:
      case SpojniceStates.BlueStrikeOutRedPlaying:
      case SpojniceStates.RedStrikeOutBluePlaying:
        return index;
    }
    return -1;
  }
);
export const selectors = {
  getCurrentStateDescription,
  getCurrentIndex,
  isInputEnabled,
  getTurnColor,
  getConnections,
  getLeftSideTiles,
  getRightSideTiles,
  getRedPlayerPoints,
  getBluePlayerPoints
};
