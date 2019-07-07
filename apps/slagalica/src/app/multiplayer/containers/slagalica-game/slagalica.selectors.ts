import * as fromPlayer from '@slagalica-app/multiplayer/reducers';
import { createSelector } from '@ngrx/store';

const getGame = fromPlayer.getSlagalicaGame;

const getRedPlayer = createSelector(
  getGame,
  game => game.red
);

const getRedWord = createSelector(
  getRedPlayer,
  player => player.word
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
  fromPlayer.getAmIBlue,
  getRedWord,
  (amIBlue, redWord) => amIBlue || !!redWord
);

const getBluePlayer = createSelector(
  getGame,
  game => game.blue
);

const getBlueWord = createSelector(
  getBluePlayer,
  player => player.word
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
  fromPlayer.getAmIRed,
  getBlueWord,
  (amIRed, blueWord) => amIRed || !!blueWord
);

const getLetters = createSelector(
  getGame,
  game => game.letters
);

const isSubmitEnabled = createSelector(
  fromPlayer.getAmIRed,
  fromPlayer.getAmIBlue,
  getBlueWord,
  getRedWord,
  (amIRed, amIBlue, blueWord, redWord) => {
    if (amIRed && redWord) return false;
    else if (amIBlue && blueWord) return false;
    else return true;
  }
);

export const selectors = {
  getGame,

  getRedWord,
  getRedPoints,
  getRedError,
  isRedDisabled,

  getBlueWord,
  getBluePoints,
  getBlueError,
  isBlueDisabled,

  getLetters,
  isSubmitEnabled
};
