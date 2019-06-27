import { createAction, props } from '@ngrx/store';
import { SpojnicaGame, AsocijacijaGame } from '@slagalica/data';

export const addWord = createAction(
  '[Supervizor Page] Add Word',
  props<{ word: string }>()
);

export const addSpojnicaGame = createAction(
  '[Supervizor Page] Add Spojnica Game',
  props<{ game: SpojnicaGame }>()
);

export const addAsocijacijaGame = createAction(
  '[Supervizor Page] Add Asocijacija Game',
  props<{ game: AsocijacijaGame }>()
);
