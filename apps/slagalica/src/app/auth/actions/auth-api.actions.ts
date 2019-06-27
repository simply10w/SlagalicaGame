import { props, createAction } from '@ngrx/store';
import { User } from '@slagalica/data';

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: any }>()
);

export const loginRedirect = createAction('[Auth/API] Login Redirect');

export const registerSuccess = createAction(
  '[Auth/API] Register Success',
  props<{ user: User }>()
);

export const registerFailure = createAction(
  '[Auth/API] Register Failure',
  props<{ error: any }>()
);

export const resetPasswordSuccess = createAction(
  '[Auth/API] Reset Password Success',
  props<{ user: User }>()
);

export const resetPasswordFailure = createAction(
  '[Auth/API] Reset Password Failure',
  props<{ error: any }>()
);
