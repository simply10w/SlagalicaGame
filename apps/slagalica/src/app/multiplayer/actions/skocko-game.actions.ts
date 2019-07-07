import { createAction, props } from '@ngrx/store';
import { Skocko } from '@slagalica/data';

export const guess = createAction(
  '[MultiPlayer/Game/Skocko] Guess',
  props<{ sequence: Skocko[] }>()
);
