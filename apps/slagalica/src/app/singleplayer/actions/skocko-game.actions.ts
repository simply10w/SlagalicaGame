import { createAction, props } from '@ngrx/store';
import { Skocko } from '@slagalica/data';

export const guess = createAction(
  '[Singleplayer/Game/Skocko] Guess',
  props<{ sequence: Skocko[] }>()
);
