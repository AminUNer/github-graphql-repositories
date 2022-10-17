import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import * as homeActions from './repositories.actions';

import { catchError, map, retry, switchMap } from 'rxjs/operators';
import { GetRepositoriesError, GetRepositoriesSuccess } from './repositories.actions';
import { Apollo } from "apollo-angular";
import {REPOSITORIES_LIST} from "../../graphql/graphql.queries";
import {Repository} from "../../models/repository";
import {User} from "../../models/user";
import {getEndCursor, getLoading} from "./repositories.reducer";
import {Store} from "@ngrx/store";
import {AppState} from "../index";


@Injectable()
export class RepositoriesEffects {
  endCursor: string = "";

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private apollo: Apollo) {}

  login = createEffect(() => {
    this.store.select(getEndCursor).subscribe(endCursor => {
      this.endCursor = endCursor;
    });
    return this.actions$.pipe(
      ofType(homeActions.GET_REPOSITORIES),
      switchMap(() => this.apollo
        .watchQuery({
          query: REPOSITORIES_LIST,
          variables: this.endCursor ? {
            cursor: this.endCursor || "",
          } : null,
        })
        .valueChanges),
      map((result: any) => {
        let repositories: Repository[] = [];
        result.data?.search?.edges.forEach((repository: any) => {
          let contributors: User[] = [];
          repository.node?.defaultBranchRef?.target?.history?.edges.forEach((commit: any) => {
            if (commit.node?.committer?.user?.login && contributors.findIndex((contributor) => contributor?.login === commit.node?.committer?.user?.login) === -1) {
              contributors.push(commit.node?.committer?.user);
            }
          });
          if (repository.node.url && repositories.findIndex((rep) => repository.node.url === rep.url) === -1) {
            repositories.push({
              name: repository.node.name,
              description: repository.node.description,
              isArchived: repository.node.isArchived,
              url: repository.node.url,
              createdAt: repository.node.createdAt,
              updatedAt: repository.node.updatedAt,
              owner: repository.node.owner,
              contributors,
            });
          }
        });
        return new GetRepositoriesSuccess({repositories, endCursor: result.data?.search?.pageInfo?.endCursor });
      }),
      catchError((err) => {
        console.log(err.message);
        return [new GetRepositoriesError(err)]
      })
    );
  })
}
