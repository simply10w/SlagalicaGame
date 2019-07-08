import * as fromPlayer from '@slagalica-app/singleplayer/reducers';
import { createSelector } from '@ngrx/store';

const getGame = fromPlayer.getSkockoGame;

const isGameDone = createSelector(
  getGame,
  game => game.gameEnded
);

const getTriesList = createSelector(
  getGame,
  game => game.tries
);

const getPoints = createSelector(
  getGame,
  game => game.points
);

export const selectors = {
  isGameDone,
  getTriesList,
  getPoints
};
