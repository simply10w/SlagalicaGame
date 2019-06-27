import { createAction, props } from '@ngrx/store';
import { SpojnicaGame } from '@slagalica/data';

export const addWord = createAction(
  '[Supervizor Page] Add Word',
  props<{ word: string }>()
);

export const addSpojnicaGame = createAction(
  '[Supervizor Page] Add Spojnica Game',
  props<{ game: SpojnicaGame }>()
);
