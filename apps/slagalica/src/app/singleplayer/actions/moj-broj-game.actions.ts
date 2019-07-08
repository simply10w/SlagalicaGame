import { createAction, props } from '@ngrx/store';

export const submitTry = createAction(
  '[SinglePlayer/Game/MojBroj] Submit Try',
  props<{ formula: string }>()
);
