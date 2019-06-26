import { AuthApiActions, LandingPageActions } from '../actions';
import { createReducer, on } from '@ngrx/store';

export interface State {
  loginError: string | null;
  loginPending: boolean;
  registerError: string | null;
  registerPending: boolean;
}

export const initialState: State = {
  loginError: null,
  loginPending: false,
  registerError: null,
  registerPending: false
};

export const reducer = createReducer(
  initialState,
  on(LandingPageActions.login, state => ({
    ...state,
    loginError: null,
    loginPending: true
  })),

  on(AuthApiActions.loginSuccess, state => ({
    ...state,
    loginError: null,
    loginPending: false
  })),
  on(AuthApiActions.loginFailure, (state, { error }) => ({
    ...state,
    loginError: error,
    loginPending: false
  })),

  on(LandingPageActions.register, state => ({
    ...state,
    registerError: null,
    registerPending: true
  })),

  on(AuthApiActions.registerSuccess, state => ({
    ...state,
    registerError: null,
    registerPending: false
  })),
  on(AuthApiActions.registerFailure, (state, { error }) => ({
    ...state,
    registerError: error,
    registerPending: false
  }))
);

export const getLoginError = (state: State) => state.loginError;
export const getLoginPending = (state: State) => state.loginPending;

export const getRegisterError = (state: State) => state.registerError;
export const getRegisterPending = (state: State) => state.registerPending;
