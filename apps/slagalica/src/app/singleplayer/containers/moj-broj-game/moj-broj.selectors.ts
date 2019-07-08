import * as fromPlayer from '@slagalica-app/singleplayer/reducers';
import { createSelector } from '@ngrx/store';

const getGame = fromPlayer.getMojBrojGame;

const getFormula = createSelector(
  getGame,
  game => game.formula
);

const getResult = createSelector(
  getGame,
  game => game.result
);

const getPoints = createSelector(
  getGame,
  game => game.points
);

const getError = createSelector(
  getGame,
  game => game.error
);

const getOptions = createSelector(
  getGame,
  game => game.options
);
const getGoal = createSelector(
  getGame,
  game => game.goal
);

export const selectors = {
  getOptions,
  getGoal,

  getError,
  getPoints,
  getFormula,
  getResult
};
