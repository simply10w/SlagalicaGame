import { createAction, props } from '@ngrx/store';
import { AvailableRoom } from '@slagalica/data';

export const getAvailableRoomsSuccess = createAction(
  '[Player/API] Get Available Rooms Success',
  props<{ rooms: AvailableRoom[] }>()
);

export const getAvailableRoomsFailure = createAction(
  '[Player/API] Get Available Rooms Failure',
  props<{ error: any }>()
);

export const createRoomSuccess = createAction(
  '[Player/API] Create Room Success'
);

export const createRoomFailure = createAction(
  '[Player/API] Create Room Failure',
  props<{ error: string }>()
);

export const joinRoomSuccess = createAction('[Player/API] Join Room Success');

export const joinRoomFailure = createAction(
  '[Player/API] Join Room Failure',
  props<{ error: string }>()
);

export const stateChangeUpdate = createAction(
  '[Player/API] State Change Update',
  props<{ newState: any }>()
);
