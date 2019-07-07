import { createReducer, on } from '@ngrx/store';
import { AdminApiActions } from '@slagalica-app/admin/actions';
import { SpojnicaGame } from '@slagalica/data';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<SpojnicaGame> {}

export const adapter: EntityAdapter<SpojnicaGame> = createEntityAdapter<
  SpojnicaGame
>({
  selectId: game => game._id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,
  on(AdminApiActions.getSpojnicaGamesSuccess, (state, { games }) =>
    adapter.addAll(games, state)
  )
);
