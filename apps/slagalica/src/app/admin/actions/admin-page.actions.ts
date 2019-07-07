import { createAction, props } from '@ngrx/store';
import { GameOfTheDay } from '@slagalica/data';

export const getPendingUsers = createAction('[Admin Page] Get Pending Users');

export const acceptPendingUser = createAction(
  '[Admin Page] Accept Pending User',
  props<{ user: string }>()
);

export const rejectPendingUser = createAction(
  '[Admin Page] Reject Pending User',
  props<{ user: string }>()
);

export const getAsocijacijaGames = createAction(
  '[Admin Page] Get Asocijacija Games'
);

export const getSpojnicaGames = createAction('[Admin Page] Get Spojnica Games');

export const createGameOfTheDay = createAction(
  '[Admin Page] Create game of the day',
  props<{ game: GameOfTheDay }>()
);
