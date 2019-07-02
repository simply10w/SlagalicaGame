import { createReducer, on } from '@ngrx/store';
import { PlayerApiActions } from '@slagalica-app/player/actions';
import { AuthActions } from '@slagalica-app/auth/actions';

export interface State {
  inRoom: boolean | null;
}

export const initialState: State = {
  inRoom: null
};

export const reducer = createReducer(
  initialState,
  on(
    PlayerApiActions.joinRoomSuccess,
    PlayerApiActions.createRoomSuccess,
    state => ({
      ...state,
      inRoom: true
    })
  ),
  on(AuthActions.logoutConfirmation, state => ({
    ...state,
    inRoom: false
  }))
);

export const getIsInRoom = (state: State) => state.inRoom;
