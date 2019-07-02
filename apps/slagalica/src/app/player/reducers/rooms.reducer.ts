import { createReducer, on } from '@ngrx/store';
import { PlayerApiActions } from '@slagalica-app/player/actions';
import { AvailableRoom } from '@slagalica/data';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<AvailableRoom> {}

export const adapter: EntityAdapter<AvailableRoom> = createEntityAdapter<
  AvailableRoom
>({
  selectId: room => room.roomId,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,
  on(PlayerApiActions.getAvailableRoomsSuccess, (state, { rooms }) =>
    adapter.addAll(rooms, state)
  )
);
