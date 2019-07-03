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

export interface PlayerState {
  rooms: fromRooms.State;
  room: fromRoom.State;
  game: fromGame.State;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: PlayerState | undefined, action: Action) {
  return combineReducers({
    rooms: fromRooms.reducer,
    room: fromRoom.reducer,
    game: fromGame.reducer
  })(state, action);
}

export const getPlayerState = createFeatureSelector<PlayerState>('player');

export const getRoomsEntitiesState = createSelector(
  getPlayerState,
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
  getPlayerState,
  state => state.room
);

export const getIsInRoom = createSelector(
  getRoomState,
  fromRoom.getIsInRoom
);

export const getGameState = createSelector(
  getPlayerState,
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

export const getCurrentTurn = createSelector(
  getGameState,
  fromGame.getCurrentTurn
);

export const getCurrentGame = createSelector(
  getGameState,
  fromGame.getCurrentGame
);

export const getSlagalicaGame = createSelector(
  getGameState,
  fromGame.getSlagalicaGame
);

export const getSlagalicaGameLetters = createSelector(
  getGameState,
  fromGame.getSlagalicaGameLetters
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

export const getRedPlayerSlagalicaWord = createSelector(
  getSlagalicaGame,
  game => game.redPlayerTry.word
);

export const getBluePlayerSlagalicaWord = createSelector(
  getSlagalicaGame,
  game => game.bluePlayerTry.word
);

export const getMojBrojGame = createSelector(
  getGameState,
  fromGame.getMojBrojGame
);

export const getMojBrojGameOptions = createSelector(
  getMojBrojGame,
  game => game.options
);

export const getMojBrojGameGoal = createSelector(
  getMojBrojGame,
  game => game.goal
);

export const getRedPlayerMojBrojTry = createSelector(
  getMojBrojGame,
  game => game.redPlayerTry
);

export const getBluePlayerMojBrojTry = createSelector(
  getMojBrojGame,
  game => game.bluePlayerTry
);
