import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../store";
import { GetRepositories } from "../../store/repositories/repositories.actions";
import {getEndCursor, getError, getLoading, getRepositories} from "../../store/repositories/repositories.reducer";
import {Repository} from "../../models/repository";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
})
export class RepositoriesComponent implements OnInit {
  objectKeys = Object.keys;
  repositories: {
    [key: string]: Repository[]
  } = {};
  endCursor: string = "";
  name: any;
  loading = true;
  error: string = "";
  constructor(private store: Store<AppState>,
  private _snackBar: MatSnackBar) {}


  fetchRepositories(): void {
    this.store.dispatch(new GetRepositories({cursor: this.endCursor}));
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    this.fetchRepositories();
    this.store.select(getRepositories).subscribe(repositories => {
      this.repositories = repositories;
    });
    this.store.select(getLoading).subscribe(loading => {
      this.loading = loading;
    });
    this.store.select(getEndCursor).subscribe(endCursor => {
      this.endCursor = endCursor;
    });
    this.store.select(getError).subscribe(error => {
      this.error = error;
      if (error) {
        this.openSnackBar(error, "Close");
      }
    });

  }
}
