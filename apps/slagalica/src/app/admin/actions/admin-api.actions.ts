import { props, createAction } from '@ngrx/store';
import {
  User,
  SpojnicaGame,
  AsocijacijaGame,
  GameOfTheDay
} from '@slagalica/data';

export const getPendingUsersSuccess = createAction(
  '[Admin/API] Get Pending Users Success',
  props<{ users: User[] }>()
);

export const getPendingUsersFailure = createAction(
  '[Admin/API] Get Pending Users Failure',
  props<{ error: any }>()
);

export const acceptPendingUserSuccess = createAction(
  '[Admin/API] Accept Pending User Success',
  props<{ user: string }>()
);

export const acceptPendingUserFailure = createAction(
  '[Admin/API] Accept Pending User Failure',
  props<{ error: any }>()
);

export const rejectPendingUserSuccess = createAction(
  '[Admin/API] Reject Pending User Success',
  props<{ user: string }>()
);

export const rejectPendingUserFailure = createAction(
  '[Admin/API] Reject Pending User Failure',
  props<{ error: any }>()
);

export const getSpojnicaGamesSuccess = createAction(
  '[Admin/API] Get Spojnica Games Success',
  props<{ games: SpojnicaGame[] }>()
);

export const getSpojnicaGamesFailure = createAction(
  '[Admin/API] Get Spojnica Games Failure',
  props<{ error: any }>()
);

export const getAsocijacijaGamesSuccess = createAction(
  '[Admin/API] Get Asocijacija Games Success',
  props<{ games: AsocijacijaGame[] }>()
);

export const getAsocijacijaGamesFailure = createAction(
  '[Admin/API] Get Asocijacija Games Failure',
  props<{ error: any }>()
);

export const createGameOfTheDaySuccess = createAction(
  '[Admin/API] Create game of the day Success',
  props<{ game: GameOfTheDay }>()
);

export const createGameOfTheDayFailure = createAction(
  '[Admin/API] Create game of the day Failure',
  props<{ error: any }>()
);
