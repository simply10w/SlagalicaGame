import { createAction, props } from '@ngrx/store';

export const createRoom = createAction('[Player Page] Create Room');

export const joinRoom = createAction(
  '[Player Page] Join Room',
  props<{ roomId: string }>()
);
