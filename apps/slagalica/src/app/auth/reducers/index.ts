import {
  createSelector,
  createFeatureSelector,
  Action,
  combineReducers
} from '@ngrx/store';
import * as fromAuth from '@slagalica-app/auth/reducers/auth.reducer';
import * as fromLandingPage from '@slagalica-app/auth/reducers/landing-page.reducer';

export interface AuthState {
  status: fromAuth.State;
  landingPage: fromLandingPage.State;
}

export function reducers(state: AuthState | undefined, action: Action) {
  return combineReducers({
    status: fromAuth.reducer,
    landingPage: fromLandingPage.reducer
  })(state, action);
}

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
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
  (state: AuthState) => state.landingPage
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
