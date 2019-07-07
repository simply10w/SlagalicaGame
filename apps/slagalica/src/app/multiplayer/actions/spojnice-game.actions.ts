import { createAction, props } from '@ngrx/store';

export const guess = createAction(
  '[MultiPlayer/Game/Spojnice] Guess',
  props<{ guess: string }>()
);
