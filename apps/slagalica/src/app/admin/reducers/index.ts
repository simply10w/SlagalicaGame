import {
  createSelector,
  createFeatureSelector,
  combineReducers,
  Action
} from '@ngrx/store';
import * as fromUsers from '@slagalica-app/admin/reducers/users.reducer';
import * as fromSpojnica from '@slagalica-app/admin/reducers/spojnica.reducer';
import * as fromAsocijacija from '@slagalica-app/admin/reducers/asocijacija.reducer';

export interface AdminState {
  users: fromUsers.State;
  asocijacija: fromAsocijacija.State;
  spojnica: fromSpojnica.State;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: AdminState | undefined, action: Action) {
  return combineReducers({
    users: fromUsers.reducer,
    asocijacija: fromAsocijacija.reducer,
    spojnica: fromSpojnica.reducer
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

export const getAsocijacijaEntitiesState = createSelector(
  getAdminState,
  state => state.asocijacija
);

export const {
  selectIds: getAsocijacijaIds,
  selectEntities: getAsocijacijaEntities,
  selectAll: getAllAsocijacijas,
  selectTotal: getTotalAsocijacijas
} = fromAsocijacija.adapter.getSelectors(getAsocijacijaEntitiesState);

export const getSpojnicaEntitiesState = createSelector(
  getAdminState,
  state => state.spojnica
);

export const {
  selectIds: getSpojnicaIds,
  selectEntities: getSpojnicaEntities,
  selectAll: getAllSpojnicas,
  selectTotal: getTotalSpojnicas
} = fromSpojnica.adapter.getSelectors(getSpojnicaEntitiesState);
