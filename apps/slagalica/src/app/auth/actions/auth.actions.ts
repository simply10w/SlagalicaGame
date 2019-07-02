import { createAction } from '@ngrx/store';

export const logout = createAction('[Auth] Logout');
export const logoutConfirmation = createAction('[Auth] Logout Confirmation');
export const logoutConfirmationDismiss = createAction(
  '[Auth] Logout Confirmation Dismiss'
);

export const sessionConfirmation = createAction('[Auth] Session Confirmation');
export const sessionConfirmationSuccess = createAction(
  '[Auth] Session Confirmation Success'
);
export const sessionConfirmationFailure = createAction(
  '[Auth] Session Confirmation Failure'
);
