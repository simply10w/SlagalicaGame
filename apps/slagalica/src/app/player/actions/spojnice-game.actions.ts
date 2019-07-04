import { createAction, props } from '@ngrx/store';

export const guess = createAction(
  '[Game/Spojnice] Guess',
  props<{ guess: string }>()
);

export const skip = createAction('[Game/Spojnice] Skip');
