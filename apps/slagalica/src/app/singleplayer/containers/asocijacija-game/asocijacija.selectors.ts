import * as fromPlayer from '@slagalica-app/singleplayer/reducers';
import { createSelector } from '@ngrx/store';

const getGame = fromPlayer.getAsocijacijaGame;

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

const getPoints = createSelector(
  getGame,
  game => game.points
);

export const selectors = {
  getSolvedList,

  getGameSolution,
  getTiles,

  getPoints
};
