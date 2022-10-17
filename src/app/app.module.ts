import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { RepositoriesComponent } from './components/repositories/repositories.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";
import { StoreModule } from "@ngrx/store";
import { metaReducers, reducers } from "./store";
import { reducer } from "./store/repositories/repositories.reducer";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from "@ngrx/effects";
import { RepositoriesEffects } from "./store/repositories/repositories.effects";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FlexModule } from "@angular/flex-layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ReactiveFormsModule } from "@angular/forms";
import { RepositoryComponent } from "./components/repository/repository.component";
import { DialogDataComponent } from "./components/dialog-data/dialog-data.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
    declarations: [
        AppComponent,
        RepositoriesComponent,
        RepositoryComponent,
        DialogDataComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    MatCardModule,
    MatButtonModule,
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([RepositoriesEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreModule.forFeature('repositories', reducer),
    StoreDevtoolsModule.instrument(),
    StoreModule.forRoot(
      reducers,
      {metaReducers}
    ),
    MatIconModule,
    MatProgressSpinnerModule,
    FlexModule,
    MatToolbarModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
