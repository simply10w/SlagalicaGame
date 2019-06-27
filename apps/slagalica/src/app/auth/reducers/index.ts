import {
  createSelector,
  createFeatureSelector,
  Action,
  combineReducers
} from '@ngrx/store';
import * as fromAuth from '@slagalica-app/auth/reducers/auth.reducer';
import * as fromLandingPage from '@slagalica-app/auth/reducers/landing-page.reducer';

export interface State {
  status: fromAuth.State;
  landingPage: fromLandingPage.State;
}

export function reducers(state: State | undefined, action: Action) {
  return combineReducers({
    status: fromAuth.reducer,
    landingPage: fromLandingPage.reducer
  })(state, action);
}

export const selectAuthState = createFeatureSelector<State>('auth');

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: State) => state.status
);
export const getUser = createSelector(
  selectAuthStatusState,
  fromAuth.getUser
);
export const getLoggedIn = createSelector(
  getUser,
  user => !!user
);

export const selectLandingPageState = createSelector(
  selectAuthState,
  (state: State) => state.landingPage
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
