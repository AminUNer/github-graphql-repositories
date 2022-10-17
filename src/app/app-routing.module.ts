import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RepositoriesComponent} from "./components/repositories/repositories.component";

const routes: Routes = [
  { path: 'repositories', component: RepositoriesComponent},
  { path: '',   redirectTo: '/repositories', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
