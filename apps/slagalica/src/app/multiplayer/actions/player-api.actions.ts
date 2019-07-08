import { createAction, props } from '@ngrx/store';
import { AvailableRoom } from '@slagalica/data';

export const getAvailableRoomsSuccess = createAction(
  '[MultiPlayer/API] Get Available Rooms Success',
  props<{ rooms: AvailableRoom[] }>()
);

export const getAvailableRoomsFailure = createAction(
  '[MultiPlayer/API] Get Available Rooms Failure',
  props<{ error: any }>()
);

export const createRoomSuccess = createAction(
  '[MultiPlayer/API] Create Room Success'
);

export const createRoomFailure = createAction(
  '[MultiPlayer/API] Create Room Failure',
  props<{ error: string }>()
);

export const joinRoomSuccess = createAction(
  '[MultiPlayer/API] Join Room Success',
  props<{ roomId: string }>()
);

export const joinRoomFailure = createAction(
  '[MultiPlayer/API] Join Room Failure',
  props<{ error: string; roomId: string }>()
);

export const stateChangeUpdate = createAction(
  '[MultiPlayer/API] State Change Update',
  props<{ newState: any }>()
);
