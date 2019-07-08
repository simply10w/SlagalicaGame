import { createReducer, on } from '@ngrx/store';
import { PlayerApiActions } from '@slagalica-app/singleplayer/actions';
import { SingleplayerResultDto } from '@slagalica/data';

export interface State {
  single: SingleplayerResultDto[];
  multi: any[];
}

export const initialState: State = {
  single: [],
  multi: []
};

export const reducer = createReducer(
  initialState,
  on(PlayerApiActions.loadSingleResultsSuccess, (state, { results }) => ({
    ...state,
    single: results
  })),
  on(PlayerApiActions.loadMultiResultsSuccess, (state, { results }) => ({
    ...state,
    multi: results
  }))
);

export const getSingleList = (state: State) =>
  state.single.filter(result => result.player);

export const getMultiList = (state: State) => state.multi;
