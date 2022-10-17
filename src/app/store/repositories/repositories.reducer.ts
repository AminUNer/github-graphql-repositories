import * as repositoriesActions from './repositories.actions';
import { PayloadAction } from '../app.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Repository } from "../../models/repository";



export interface State {
  repositories: {
    [key: string]: Repository []
  };
  endCursor: string;
  loading: boolean;
  error: string;
}

const initialState: State = {
  repositories: {},
  endCursor: "",
  loading: false,
  error: "",
};

export function reducer(state = initialState, action: PayloadAction): State {
  switch (action.type) {
    case repositoriesActions.GET_REPOSITORIES:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case repositoriesActions.GET_REPOSITORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        repositories: {
          ...state.repositories,
          [action.payload.endCursor]: action.payload.repositories,
        },
        endCursor: action.payload.endCursor,
      };
    case repositoriesActions.GET_REPOSITORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
  }
  return state;
}


/*************************
 * SELECTORS
 ************************/
export const getRepositoryState = createFeatureSelector < State > ('repositories');
export const getRepositories = createSelector(getRepositoryState, (state: State) => state.repositories);
export const getLoading = createSelector(getRepositoryState, (state: State) => state.loading);
export const getEndCursor = createSelector(getRepositoryState, (state: State) => state.endCursor);
export const getError = createSelector(getRepositoryState, (state: State) => state.error);
