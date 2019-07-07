import * as fromPlayer from '@slagalica-app/multiplayer/reducers';
import { createSelector } from '@ngrx/store';
import { AsocijacijaStates } from '@slagalica/data';

const getGame = fromPlayer.getAsocijacijaGame;

const getGameState = createSelector(
  getGame,
  game => game.state
);

const getCurrentStateDescription = createSelector(
  getGameState,
  state => {
    switch (state) {
      case AsocijacijaStates.RedPlaying:
        return 'Red open a tile.';
      case AsocijacijaStates.BluePlaying:
        return 'Blue open a tile.';
      case AsocijacijaStates.RedSolving:
        return 'Red try to solve.';
      case AsocijacijaStates.BlueSolving:
        return 'Blue try to solve.';
      case AsocijacijaStates.Finished:
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
      state === AsocijacijaStates.RedPlaying ||
      state === AsocijacijaStates.RedSolving,
    blue:
      state === AsocijacijaStates.BluePlaying ||
      state === AsocijacijaStates.BlueSolving
  })
);

const isInputEnabled = createSelector(
  getGameState,
  fromPlayer.getAmIBlue,
  fromPlayer.getAmIRed,
  (state, amIBlue, amIRed) => {
    if (state === AsocijacijaStates.RedSolving && amIRed) return true;
    else if (state === AsocijacijaStates.BlueSolving && amIBlue) return true;
    else return false;
  }
);

const getSolved = createSelector(
  getGame,
  game => game.solved
);

const getSolvedList = createSelector(
  getSolved,
  solved => {
    const solutionIndexes = [4, 9, 14, 19];
    return solutionIndexes.map(solution => solved[solution]).map(Boolean);
  }
);

const getTiles = createSelector(
  getGame,
  game => game.tiles
);

const getGameSolution = createSelector(
  getTiles,
  tiles => tiles[20]
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

export const selectors = {
  getSolvedList,
  getCurrentStateDescription,
  isInputEnabled,
  getTurnColor,

  getGameSolution,
  getTiles,

  getRedPlayerPoints,
  getBluePlayerPoints
};
