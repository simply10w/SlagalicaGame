import * as fromAuth from '@slagalica-app/auth/reducers';
import {
  createSelector,
  combineReducers,
  createFeatureSelector,
  Action
} from '@ngrx/store';
import { ClientGameRoomOptionsDto } from '@slagalica/data';
import * as fromRoom from './room.reducer';
import * as fromGame from './game.reducer';

export interface SingleplayerState {
  room: fromRoom.State;
  game: fromGame.State;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: SingleplayerState | undefined, action: Action) {
  return combineReducers({
    room: fromRoom.reducer,
    game: fromGame.reducer
  })(state, action);
}

export const getSingleplayerState = createFeatureSelector<SingleplayerState>(
  'singleplayer'
);

export const getPlayerInfo = createSelector(
  fromAuth.getUser,
  fromAuth.getToken,
  (user, token) =>
    <ClientGameRoomOptionsDto>{
      userName: user.userName,
      userId: user._id,
      token
    }
);

export const getRoomState = createSelector(
  getSingleplayerState,
  state => state.room
);

export const getIsInRoom = createSelector(
  getRoomState,
  fromRoom.getIsInRoom
);

const getGameState = createSelector(
  getSingleplayerState,
  state => state.game
);

export const getPlayer = createSelector(
  getGameState,
  fromGame.getPlayer
);

export const getCurrentGame = createSelector(
  getGameState,
  fromGame.getCurrentGame
);

export const getTime = createSelector(
  getGameState,
  fromGame.getTime
);

export const getSlagalicaGame = createSelector(
  getGameState,
  fromGame.getSlagalicaGame
);

export const getMojBrojGame = createSelector(
  getGameState,
  fromGame.getMojBrojGame
);

export const getSkockoGame = createSelector(
  getGameState,
  fromGame.getSkockoGame
);

export const getAsocijacijaGame = createSelector(
  getGameState,
  fromGame.getAsocijacijaGame
);

export const getSpojniceGame = createSelector(
  getGameState,
  fromGame.getSpojniceGame
);
