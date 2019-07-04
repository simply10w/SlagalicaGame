import { createReducer, createSelector, on } from '@ngrx/store';
import { AuthActions } from '@slagalica-app/auth/actions';
import { PlayerApiActions } from '@slagalica-app/player/actions';
import { merge, mergeWith, isNil, isPlainObject } from 'lodash';
import {
  Skocko,
  PlayerRole,
  AsocijacijaStates,
  SpojniceStates
} from '@slagalica/data';

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
  blue: {
    word: string;
    points: number;
    error: string;
  };
  red: {
    word: string;
    points: string;
    error: string;
  };
  winner: string;
}

interface StateMojBrojGame {
  options: number[];
  goal: number;
  blue: {
    formula: string;
    result: number;
    points: number;
    error: string;
  };
  red: {
    formula: string;
    result: number;
    points: number;
    error: string;
  };
  winner: string;
}

interface StateSkockoGame {
  red: {
    tries: {
      try: Skocko[];
      result: boolean[];
    }[];
    points: number;
  };
  blue: {
    tries: {
      try: Skocko[];
      result: boolean[];
    }[];
    points: number;
  };
  turn: PlayerRole | 'waiting_for_next_game';
  winner: string;
}

interface StateAsocijacijaGame {
  red: {
    points: number;
  };
  blue: {
    points: number;
  };
  solved: PlayerRole[];
  tiles: string[];
  state: AsocijacijaStates;
}

interface StateSpojniceGame {
  red: {
    points: number;
  };
  blue: {
    points: number;
  };
  leftSide: any[];
  rightSide: any[];
  currentIndex: number;
  state: SpojniceStates;
}

export interface State {
  time: number;
  red: StatePlayer;
  blue: StatePlayer;
  currentGame: string;
  currentTurn: 'red' | 'blue';
  skockoGame: StateSkockoGame;
  spojniceGame: StateSpojniceGame;
  slagalicaGame: StateSlagalicaGame;
  mojBrojGame: StateMojBrojGame;
  asocijacijeGame: StateAsocijacijaGame;
}

export const initialState: Partial<State> = {
  time: null,
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
  asocijacijeGame: {
    solved: [],
    tiles: [],
    state: null,
    blue: {
      points: null
    },
    red: {
      points: null
    }
  },
  slagalicaGame: {
    letters: [],
    blue: {
      word: null,
      points: null,
      error: null
    },
    red: {
      word: null,
      points: null,
      error: null
    },
    winner: null
  },
  mojBrojGame: {
    options: [],
    goal: null,
    blue: {
      formula: null,
      result: null,
      points: null,
      error: null
    },
    red: {
      formula: null,
      result: null,
      points: null,
      error: null
    },
    winner: null
  },
  skockoGame: {
    winner: null,
    turn: null,
    blue: {
      tries: [],
      points: null
    },
    red: {
      tries: [],
      points: null
    }
  },
  spojniceGame: {
    red: {
      points: null
    },
    blue: {
      points: null
    },
    state: null,
    leftSide: [],
    rightSide: [],
    currentIndex: null
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

export const getTime = (state: State) => state.time;

export const getRedPlayer = (state: State) => state.red;

export const getBluePlayer = (state: State) => state.blue;

export const getCurrentTurn = (state: State) => state.currentTurn;

export const getCurrentGame = (state: State) => state.currentGame;

export const getSlagalicaGame = (state: State) => state.slagalicaGame;

export const getMojBrojGame = (state: State) => state.mojBrojGame;

export const getSkockoGame = (state: State) => state.skockoGame;

export const getSpojniceGame = (state: State) => state.spojniceGame;

export const getCurrentSkockoPlayer = createSelector(
  getSkockoGame,
  game => {
    switch (game.turn) {
      case PlayerRole.Red:
        return game.red;
      case PlayerRole.Blue:
        return game.blue;
      default:
        return null;
    }
  }
);

export const getAsocijacijaGame = (state: State) => state.asocijacijeGame;
