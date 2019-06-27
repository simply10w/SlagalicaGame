import { props, createAction } from '@ngrx/store';
import { AsocijacijaGame } from '@slagalica/data';

export const addAsocijacijaGameSuccess = createAction(
  '[AsocijacijaGame/API] Add Asocijacija Game Success',
  props<{ game: AsocijacijaGame }>()
);

export const addAsocijacijaGameFailure = createAction(
  '[AsocijacijaGame/API] Add Asocijacija Game Failure',
  props<{ error: any }>()
);
