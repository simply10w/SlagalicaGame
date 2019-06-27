import { localStorageSync, LocalStorageConfig } from 'ngrx-store-localstorage';
import { ActionReducer } from '@ngrx/store';

const PERSISTED_PARTS = ['auth'];

const localStorageSyncOptions: LocalStorageConfig = {
  keys: PERSISTED_PARTS,
  rehydrate: true,
  storageKeySerializer: (key: string) => `SLA_${key}`
};

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync(localStorageSyncOptions)(reducer);
}
