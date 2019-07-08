import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '@slagalica-app/auth/actions';
import {
  PlayerApiActions,
  GameActions
} from '@slagalica-app/singleplayer/actions';
import { mergeWith, isNil, isPlainObject, isArray } from 'lodash';
import { Skocko, PlayerRole } from '@slagalica/data';

/**
 * Useful in combination with mergeWith from lodash
 * it wont apply nulls to entire objects if source has null
 * and destination has some values defined already
 */
function skipNull(dstValue, srcValue) {
  if (isArray(srcValue) && isArray(dstValue)) {
    return srcValue;
  }

  if (isNil(srcValue) && isPlainObject(dstValue)) {
    return dstValue;
  }
}

export function stateMerge(...objects: object[]): any {
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
  word: string;
  points: number;
  error: string;
}

interface StateMojBrojGame {
  options: number[];
  goal: number;
  formula: string;
  result: number;
  points: number;
  error: string;
}

interface StateSkockoGame {
  tries: {
    try: Skocko[];
    result: boolean[];
  }[];
  points: number;
  gameEnded: boolean;
}

interface StateAsocijacijaGame {
  points: number;
  solved: boolean[];
  tiles: string[];
  finished: boolean;
}

interface StateSpojniceGame {
  points: number;
  leftSide: string[];
  rightSide: string[];
  currentIndex: number;
  finished: boolean;
  connections: {
    from: number;
    to: number;
    by: PlayerRole;
  }[];
}

export interface State {
  time: number;
  player: StatePlayer;
  currentGame: string;
  skockoGame: StateSkockoGame;
  spojniceGame: StateSpojniceGame;
  slagalicaGame: StateSlagalicaGame;
  mojBrojGame: StateMojBrojGame;
  asocijacijeGame: StateAsocijacijaGame;
}

export const initialState: Partial<State> = {
  time: null,
  player: {
    playerId: null,
    userId: null,
    userName: null,
    totalPoints: 0
  },
  asocijacijeGame: {
    solved: [],
    tiles: [],
    points: null,
    finished: null
  },
  slagalicaGame: {
    letters: [],
    word: null,
    points: null,
    error: null
  },
  mojBrojGame: {
    options: [],
    goal: null,
    formula: null,
    result: null,
    points: null,
    error: null
  },
  skockoGame: {
    gameEnded: false,
    tries: [],
    points: null
  },
  spojniceGame: {
    points: null,
    finished: null,
    leftSide: [],
    rightSide: [],
    currentIndex: null,
    connections: []
  }
};

export const reducer = createReducer(
  initialState,
  on(PlayerApiActions.stateChangeUpdate, (state, { newState }) =>
    stateMerge(state, newState)
  ),
  /**
   * TODO: ADD END GAME
   */
  on(AuthActions.logoutConfirmation, GameActions.leaveGame, () => initialState)
);

export const getTime = (state: State) => state.time;

export const getPlayer = (state: State) => state.player;

export const getCurrentGame = (state: State) => state.currentGame;

export const getSlagalicaGame = (state: State) => state.slagalicaGame;

export const getMojBrojGame = (state: State) => state.mojBrojGame;

export const getSkockoGame = (state: State) => state.skockoGame;

export const getSpojniceGame = (state: State) => state.spojniceGame;

export const getAsocijacijaGame = (state: State) => state.asocijacijeGame;
