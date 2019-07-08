import * as fromPlayer from '@slagalica-app/singleplayer/reducers';
import { createSelector } from '@ngrx/store';

const getGame = fromPlayer.getSlagalicaGame;

const getWord = createSelector(
  getGame,
  player => player.word
);

const getPoints = createSelector(
  getGame,
  player => player.points
);

const getError = createSelector(
  getGame,
  player => player.error
);

const getLetters = createSelector(
  getGame,
  game => game.letters
);

export const selectors = {
  getGame,

  getWord,
  getPoints,
  getError,

  getLetters
};
