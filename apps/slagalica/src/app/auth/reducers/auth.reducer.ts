import { createReducer, on } from '@ngrx/store';
import { AuthActions, AuthApiActions } from '@slagalica-app/auth/actions';
import { User } from '@slagalica/data';

export interface State {
  user: User | null;
  token: string;
}

export const initialState: State = {
  user: null,
  token: null
};

export const reducer = createReducer(
  initialState,
  on(AuthApiActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token
  })),
  on(AuthActions.logout, () => initialState)
);

export const getUser = (state: State) => state.user;
export const getToken = (state: State) => state.token;
