import { createAction, props } from '@ngrx/store';

export const submitTry = createAction(
  '[SinglePlayer/Game/Slagalica] Submit Try',
  props<{ word: string }>()
);
