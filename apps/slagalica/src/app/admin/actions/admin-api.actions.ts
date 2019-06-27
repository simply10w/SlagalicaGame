import { props, createAction } from '@ngrx/store';
import { User } from '@slagalica/data';

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
