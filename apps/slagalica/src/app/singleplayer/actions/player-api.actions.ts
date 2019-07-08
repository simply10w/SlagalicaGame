import { createAction, props } from '@ngrx/store';
import { SingleplayerResultDto } from '@slagalica/data';

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

export const loadSingleResultsSuccess = createAction(
  '[SinglePlayer/API] Load Single Results Success',
  props<{ results: SingleplayerResultDto[] }>()
);

export const loadSingleResultsFailure = createAction(
  '[SinglePlayer/API] Load Single Results Failure',
  props<{ error: any }>()
);

export const loadMultiResultsSuccess = createAction(
  '[SinglePlayer/API] Load Multi Results Success',
  props<{ results: any[] }>()
);

export const loadMultiResultsFailure = createAction(
  '[SinglePlayer/API] Load Multi Results Failure',
  props<{ error: any }>()
);
