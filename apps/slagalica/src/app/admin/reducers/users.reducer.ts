import { createReducer, on } from '@ngrx/store';
import {
  AdminPageActions,
  AdminApiActions
} from '@slagalica-app/admin/actions';
import { User } from '@slagalica/data';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<User> {}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: user => user._id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,
  on(AdminApiActions.getPendingUsersSuccess, (state, { users }) =>
    adapter.addAll(users, state)
  ),
  on(
    AdminApiActions.rejectPendingUserSuccess,
    AdminApiActions.acceptPendingUserSuccess,
    (state, { user }) => adapter.removeOne(user, state)
  )
);
