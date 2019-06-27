import { props, createAction } from '@ngrx/store';
import { Word } from '@slagalica/data';

export const addWordSuccess = createAction(
  '[WordsGame/API] Add Word Success',
  props<{ word: Word }>()
);

export const addWordFailure = createAction(
  '[WordsGame/API] Add Word Failure',
  props<{ error: any; word: string }>()
);
