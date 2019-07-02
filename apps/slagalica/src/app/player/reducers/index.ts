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

export interface PlayerState {
  rooms: fromRooms.State;
  room: fromRoom.State;
}

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

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: PlayerState | undefined, action: Action) {
  return combineReducers({
    rooms: fromRooms.reducer,
    room: fromRoom.reducer
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

export const getRoomState = createSelector(
  getPlayerState,
  state => state.room
);

export const getIsInRoom = createSelector(
  getRoomState,
  fromRoom.getIsInRoom
);