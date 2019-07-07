import { createAction, props } from '@ngrx/store';

export const submitPlayerTry = createAction(
  '[MultiPlayer/Game/MojBroj] Submit Player Try',
  props<{ formula: string }>()
);
