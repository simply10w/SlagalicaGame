import * as fromPlayer from '@slagalica-app/player/reducers';
import { createSelector } from '@ngrx/store';

const getGame = fromPlayer.getMojBrojGame;

const getRedPlayer = createSelector(
  getGame,
  game => game.red
);

const getRedFormula = createSelector(
  getRedPlayer,
  player => player.formula
);

const getRedResult = createSelector(
  getRedPlayer,
  player => player.result
);

const getRedPoints = createSelector(
  getRedPlayer,
  player => player.points
);

const getRedError = createSelector(
  getRedPlayer,
  player => player.error
);

const isRedDisabled = createSelector(
  fromPlayer.getAmIRed,
  amIRed => !amIRed
);

const getBluePlayer = createSelector(
  getGame,
  game => game.blue
);

const getBlueFormula = createSelector(
  getBluePlayer,
  player => player.formula
);

const getBlueResult = createSelector(
  getBluePlayer,
  player => player.result
);

const getBluePoints = createSelector(
  getBluePlayer,
  player => player.points
);

const getBlueError = createSelector(
  getRedPlayer,
  player => player.error
);

const isBlueDisabled = createSelector(
  fromPlayer.getAmIBlue,
  amIBlue => !amIBlue
);

const getOptions = createSelector(
  getGame,
  game => game.options
);

const getWinner = createSelector(
  getGame,
  game => game.winner
);

const getGoal = createSelector(
  getGame,
  game => game.goal
);

export const selectors = {
  getOptions,
  getWinner,
  getGoal,

  getRedError,
  getRedPoints,
  getRedFormula,
  getRedResult,
  isRedDisabled,

  getBlueError,
  getBluePoints,
  getBlueFormula,
  getBlueResult,
  isBlueDisabled
};
