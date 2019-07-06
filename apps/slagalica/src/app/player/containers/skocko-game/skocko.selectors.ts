import * as fromPlayer from '@slagalica-app/player/reducers';
import { createSelector } from '@ngrx/store';
import { PlayerRole, SkockoGameStates } from '@slagalica/data';

const getGame = fromPlayer.getSkockoGame;

const getRedPlayer = createSelector(
  getGame,
  game => game.red
);

const getBluePlayer = createSelector(
  getGame,
  game => game.blue
);

const getGameState = createSelector(
  getGame,
  game => game.gameState
);

const isGameDone = createSelector(
  getGame,
  game => game.gameEnded
);

const getCurrentStateDescription = createSelector(
  getGameState,
  isGameDone,
  (state, isDone) => {
    if (isDone) {
      return 'Game finished.';
    }

    switch (state) {
      case SkockoGameStates.BluePlaying:
        return 'Blue playing.';
      case SkockoGameStates.RedPlaying:
        return 'Red playing.';
      case SkockoGameStates.BlueStrikeOutRedPlaying:
        return 'Red playing after blue stroke out.';
      case SkockoGameStates.RedStrikeOutBluePlaying:
        return 'Blue playing after red stroke out.';
      default:
        return 'Waiting for next game...';
    }
  }
);

const isBoardEnabled = createSelector(
  isGameDone,
  getGameState,
  getRedPlayer,
  getBluePlayer,
  fromPlayer.getAmIRed,
  fromPlayer.getAmIBlue,
  (isDone, gameState, redPlayer, bluePlayer, iAmRed, iAmBlue) => {
    if (isDone) return false;
    switch (gameState) {
      case SkockoGameStates.BluePlaying:
        return iAmBlue;
      case SkockoGameStates.RedPlaying:
        return iAmRed;
      case SkockoGameStates.BlueStrikeOutRedPlaying:
        return iAmRed && redPlayer.tries.length === 0;
      case SkockoGameStates.RedStrikeOutBluePlaying:
        return iAmBlue && bluePlayer.tries.length === 0;
      default:
        return false;
    }
  }
);

const getTriesList = createSelector(
  getGameState,
  getRedPlayer,
  getBluePlayer,
  (state, red, blue) => {
    switch (state) {
      case SkockoGameStates.BluePlaying:
        return blue.tries;
      case SkockoGameStates.RedPlaying:
        return red.tries;
      case SkockoGameStates.BlueStrikeOutRedPlaying:
        return [...blue.tries, ...red.tries];
      case SkockoGameStates.RedStrikeOutBluePlaying:
        return [...red.tries, ...blue.tries];
      case SkockoGameStates.Finished: {
        return [];
      }
    }
  }
);

const getBluePoints = createSelector(
  getBluePlayer,
  player => player.points
);

const getRedPoints = createSelector(
  getRedPlayer,
  player => player.points
);

export const selectors = {
  getGame,
  getCurrentStateDescription,
  isBoardEnabled,
  isGameDone,
  getTriesList,
  getBluePoints,
  getRedPoints
};
