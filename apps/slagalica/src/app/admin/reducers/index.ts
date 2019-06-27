import {
  createSelector,
  createFeatureSelector,
  combineReducers,
  Action
} from '@ngrx/store';
import * as fromUsers from '@slagalica-app/admin/reducers/users.reducer';

export interface AdminState {
  users: fromUsers.State;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: AdminState | undefined, action: Action) {
  return combineReducers({
    users: fromUsers.reducer
  })(state, action);
}

export const getAdminState = createFeatureSelector<AdminState>('admin');

export const getUsersEntitiesState = createSelector(
  getAdminState,
  state => state.users
);

export const {
  selectIds: getUserIds,
  selectEntities: getUserEntities,
  selectAll: getAllUsers,
  selectTotal: getTotalUsers
} = fromUsers.adapter.getSelectors(getUsersEntitiesState);
