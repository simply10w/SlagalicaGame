import { createAction, props } from '@ngrx/store';

export const createGameSuccess = createAction(
  '[SinglePlayer/API] Create Room Success'
);

export const createGameFailure = createAction(
  '[SinglePlayer/API] Create Room Failure',
  props<{ error: string }>()
);

export const stateChangeUpdate = createAction(
  '[SinglePlayer/API] State Change Update',
  props<{ newState: any }>()
);
