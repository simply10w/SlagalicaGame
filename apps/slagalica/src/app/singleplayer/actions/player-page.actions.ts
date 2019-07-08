import { createAction } from '@ngrx/store';

export const createGame = createAction('[SinglePlayer/Page] Create Game');

export const loadSingleResults = createAction(
  '[SinglePlayer/Page] Load Single results'
);

export const loadMultiResults = createAction(
  '[SinglePlayer/Page] Load Multi results'
);
