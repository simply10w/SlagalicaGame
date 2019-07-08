import { createAction, props } from '@ngrx/store';

export const guess = createAction(
  '[SinglePlayer/Game/Spojnice] Guess',
  props<{ guess: string }>()
);
