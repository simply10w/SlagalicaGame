import { props, createAction } from '@ngrx/store';
import { SpojnicaGame } from '@slagalica/data';

export const addSpojnicaGameSuccess = createAction(
  '[WordsGame/API] Add Spojnica Game Success',
  props<{ game: SpojnicaGame }>()
);

export const addSpojnicaGameFailure = createAction(
  '[WordsGame/API] Add Spojnica Game Failure',
  props<{ error: any; game: string }>()
);
