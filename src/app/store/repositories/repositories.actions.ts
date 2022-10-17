import { Action } from '@ngrx/store';
import { Repository } from '../../models/repository';

export const GET_REPOSITORIES = '[GET] Repositories';
export const GET_REPOSITORIES_SUCCESS = '[GET] Repositories Success';
export const GET_REPOSITORIES_ERROR = '[GET] Repositories Error';


/****************************************
 * GET account
 ****************************************/
export class GetRepositories implements Action {
  readonly type = GET_REPOSITORIES;

  constructor(public payload: any) {
  }
}

export class GetRepositoriesSuccess implements Action {
  readonly type = GET_REPOSITORIES_SUCCESS;

  constructor(public payload: any) {
  }
}

export class GetRepositoriesError implements Action {
  readonly type = GET_REPOSITORIES_ERROR;

  constructor(public payload: Error) {
  }

}


