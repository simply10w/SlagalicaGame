import { createAction, props } from '@ngrx/store';

export const submitPlayerTry = createAction(
  '[MultiPlayer/Game/Slagalica] Submit Player Try',
  props<{ word: string }>()
);
