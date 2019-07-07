import * as fromAuth from '@slagalica-app/auth/reducers';
import {
  createSelector,
  combineReducers,
  createFeatureSelector,
  Action
} from '@ngrx/store';
import { ClientGameRoomOptionsDto } from '@slagalica/data';
import * as fromRooms from './rooms.reducer';
import * as fromRoom from './room.reducer';
import * as fromGame from './game.reducer';

export interface MultiplayerState {
  rooms: fromRooms.State;
  room: fromRoom.State;
  game: fromGame.State;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: MultiplayerState | undefined, action: Action) {
  return combineReducers({
    rooms: fromRooms.reducer,
    room: fromRoom.reducer,
    game: fromGame.reducer
  })(state, action);
}

export const getMultiplayerState = createFeatureSelector<MultiplayerState>(
  'multiplayer'
);

export const getRoomsEntitiesState = createSelector(
  getMultiplayerState,
  state => state.rooms
);

export const {
  selectIds: getRoomIds,
  selectEntities: getRoomEntities,
  selectAll: getAllRooms,
  selectTotal: getTotalRooms
} = fromRooms.adapter.getSelectors(getRoomsEntitiesState);

export const getPlayer = createSelector(
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
  getMultiplayerState,
  state => state.room
);

export const getIsInRoom = createSelector(
  getRoomState,
  fromRoom.getIsInRoom
);

const getGameState = createSelector(
  getMultiplayerState,
  state => state.game
);

export const getRedPlayer = createSelector(
  getGameState,
  fromGame.getRedPlayer
);

export const getBluePlayer = createSelector(
  getGameState,
  fromGame.getBluePlayer
);

export const getCurrentGame = createSelector(
  getGameState,
  fromGame.getCurrentGame
);

export const getTime = createSelector(
  getGameState,
  fromGame.getTime
);

export const getAmIRed = createSelector(
  getPlayer,
  getRedPlayer,
  (currentPlayer, redPlayer) => {
    return currentPlayer.userId === redPlayer.userId;
  }
);

export const getAmIBlue = createSelector(
  getPlayer,
  getBluePlayer,
  (currentPlayer, bluePlayer) => {
    return currentPlayer.userId === bluePlayer.userId;
  }
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
