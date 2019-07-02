import { createReducer, createSelector, on } from '@ngrx/store';
import { AuthActions } from '@slagalica-app/auth/actions';
import { PlayerApiActions } from '@slagalica-app/player/actions';
import { merge, mergeWith, isNil, isPlainObject } from 'lodash';

/**
 * Useful in combination with mergeWith from lodash
 * it wont apply nulls to entire objects if source has null
 * and destination has some values defined already
 */
function skipNull(dstValue, srcValue) {
  if (isNil(srcValue) && isPlainObject(dstValue)) {
    return dstValue;
  }
}

export function mergeWithSkipNull(...objects: object[]): any {
  return mergeWith({}, ...objects, skipNull);
}

interface StatePlayer {
  playerId: string;
  totalPoints: number;
  userId: string;
  userName: string;
}

interface StateSlagalicaGame {
  letters: string[];
  bluePlayerTry: {
    word: string;
  };
  redPlayerTry: {
    word: string;
  };
}

export interface State {
  red: StatePlayer;
  blue: StatePlayer;
  currentGame: string;
  currentTurn: 'red' | 'blue';
  skockoGame: any;
  spojniceGame: any;
  slagalicaGame: StateSlagalicaGame;
  mojBrojGame: any;
  asocijacijeGame: any;
}

export const initialState: Partial<State> = {
  red: {
    playerId: null,
    userId: null,
    userName: null,
    totalPoints: 0
  },
  blue: {
    playerId: null,
    userId: null,
    userName: null,
    totalPoints: 0
  },
  slagalicaGame: {
    letters: [],
    bluePlayerTry: {
      word: null
    },
    redPlayerTry: {
      word: null
    }
  }
};

export const reducer = createReducer(
  initialState,
  on(PlayerApiActions.stateChangeUpdate, (state, { newState }) =>
    mergeWithSkipNull(state, newState)
  ),
  /**
   * TODO: ADD END GAME AND LEAVE ROOM
   */
  on(AuthActions.logoutConfirmation, () => initialState)
);

export const getRedPlayer = (state: State) => state.red;

export const getBluePlayer = (state: State) => state.blue;

export const getCurrentTurn = (state: State) => state.currentTurn;

export const getCurrentGame = (state: State) => state.currentGame;

export const getSlagalicaGame = (state: State) => state.slagalicaGame;

export const getSlagalicaGameLetters = createSelector(
  getSlagalicaGame,
  game => game.letters
);

export const getMojBrojGame = (state: State) => state.mojBrojGame;

export const getSkockoGame = (state: State) => state.skockoGame;

export const getSpojniceGame = (state: State) => state.spojniceGame;
