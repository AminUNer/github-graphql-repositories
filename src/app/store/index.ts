import { environment } from '../../environments/environment';

import * as fromRepositories from './repositories/repositories.reducer';
import {ActionReducerMap, MetaReducer, combineReducers, ActionReducer} from '@ngrx/store';
import {localStorageSync} from "ngrx-store-localstorage";


export interface AppState {
    repositories: fromRepositories.State;
}

export const reducers: ActionReducerMap<AppState> = {
    repositories: fromRepositories.reducer,
};

const rootReducer = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return rootReducer(state, action);
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['repositories'], rehydrate: true })(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [localStorageSyncReducer] : [localStorageSyncReducer];

