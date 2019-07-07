import { createAction, props } from '@ngrx/store';

export const createRoom = createAction('[MultiPlayer/Page] Create Room');

export const joinRoom = createAction(
  '[MultiPlayer/Page] Join Room',
  props<{ roomId: string }>()
);
