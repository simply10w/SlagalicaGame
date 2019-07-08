import { createReducer, on } from '@ngrx/store';
import { AdminApiActions } from '@slagalica-app/admin/actions';
import { AsocijacijaGame } from '@slagalica/data';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<AsocijacijaGame> {}

export const adapter: EntityAdapter<AsocijacijaGame> = createEntityAdapter<
  AsocijacijaGame
>({
  selectId: game => game._id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,
  on(AdminApiActions.getAsocijacijaGamesSuccess, (state, { games }) =>
    adapter.addAll(games, state)
  )
);