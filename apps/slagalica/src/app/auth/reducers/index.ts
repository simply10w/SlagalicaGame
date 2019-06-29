import {
  createSelector,
  createFeatureSelector,
  Action,
  combineReducers
} from '@ngrx/store';
import * as fromAuth from '@slagalica-app/auth/reducers/auth.reducer';
import * as fromLandingPage from '@slagalica-app/auth/reducers/landing-page.reducer';

export const authReducer = fromAuth.reducer;
export const landingPageReducer = fromLandingPage.reducer;

export const selectAuthState = createFeatureSelector<fromAuth.State>('auth');
export const selectLandingPageState = createFeatureSelector<
  fromLandingPage.State
>('landingPage');

export const getUser = createSelector(
  selectAuthState,
  fromAuth.getUser
);

export const getLoggedIn = createSelector(
  getUser,
  Boolean
);

export const getToken = createSelector(
  selectAuthState,
  fromAuth.getToken
);

export const getLoginError = createSelector(
  selectLandingPageState,
  fromLandingPage.getLoginError
);
export const getLoginPending = createSelector(
  selectLandingPageState,
  fromLandingPage.getLoginPending
);

export const getRegisterError = createSelector(
  selectLandingPageState,
  fromLandingPage.getRegisterError
);
export const getRegisterPending = createSelector(
  selectLandingPageState,
  fromLandingPage.getRegisterPending
);

export const getResetPasswordError = createSelector(
  selectLandingPageState,
  fromLandingPage.getResetPasswordError
);
export const getResetPasswordPending = createSelector(
  selectLandingPageState,
  fromLandingPage.getResetPasswordPending
);
