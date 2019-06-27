import { InjectionToken } from '@angular/core';
import * as fromRouter from '@ngrx/router-store';
import { Action, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { logger } from './logger';
import { attachStateOnWindow } from './attach-state-on-window';
import { localStorageSyncReducer } from './local-storage-sync';

export interface State {
  router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    router: fromRouter.routerReducer
  })
});

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, localStorageSyncReducer, attachStateOnWindow]
  : [localStorageSyncReducer];
