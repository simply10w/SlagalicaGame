import { createAction, props } from '@ngrx/store';

export const getPendingUsers = createAction('[Admin Page] Get Pending Users');

export const acceptPendingUser = createAction(
  '[Admin Page] Accept Pending User',
  props<{ user: string }>()
);

export const rejectPendingUser = createAction(
  '[Admin Page] Reject Pending User',
  props<{ user: string }>()
);
