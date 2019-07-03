import { createAction, props } from '@ngrx/store';

export const submitPlayerTry = createAction(
  '[Game/MojBroj] Submit Player Try',
  props<{ formula: string }>()
);
