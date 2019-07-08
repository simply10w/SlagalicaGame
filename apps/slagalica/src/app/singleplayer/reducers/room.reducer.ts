import { createReducer, on } from '@ngrx/store';
import {
  PlayerApiActions,
  GameActions
} from '@slagalica-app/singleplayer/actions';
import { AuthActions } from '@slagalica-app/auth/actions';

export interface State {
  inRoom: boolean | null;
}

export const initialState: State = {
  inRoom: null
};

export const reducer = createReducer(
  initialState,
  on(PlayerApiActions.createGameSuccess, state => ({
    ...state,
    inRoom: true
  })),
  on(AuthActions.logoutConfirmation, GameActions.leaveGame, state => ({
    ...state,
    inRoom: false
  }))
);

export const getIsInRoom = (state: State) => state.inRoom;
